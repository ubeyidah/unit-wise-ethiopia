import nodemailer from "nodemailer";

export const reciveEmail = async ({ sender, school, email, message, res }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: email,
      to: process.env.USER,
      subject: `new message from  ${sender} at ${school}`, // Subject line
      text: message, // plain text body
      replyTo: email,
    });

    res
      .status(200)
      .json({ message: "Message sent successfully", success: true });
  } catch (error) {
    console.log("error while reciving email: ", error.message);
    res.status(400).json({
      message: "Unable to send email. please check your internet",
      success: false,
    });
  }
};
