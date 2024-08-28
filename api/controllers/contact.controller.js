import { contactSchema } from "../schemas/contact.schema.js";
import { reciveEmail } from "../utils/EmailSend.js";

export const contact = (req, res) => {
  try {
    const { name, school, email, message } = req.body;
    const { error } = contactSchema.validate({ name, school, email, message });

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    reciveEmail({ sender: name, school, email, message, res });
  } catch (error) {
    console.log("Error: send message: ", error.message);

    return res.status(error.status || 500).json({ message: error.message });
  }
};
