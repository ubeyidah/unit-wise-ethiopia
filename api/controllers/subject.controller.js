import UserSubjects from "../models/userSubjects.model.js";

export const getSubjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const subjects = await UserSubjects.find({ userId });
    const subjectsToSend = subjects.map((sub) => {
      let completed = 0;
      const total = sub.subjectProgress.length;
      sub.subjectProgress.forEach((progress) => {
        if (progress.isCompleted) completed++;
      });
      return {
        _id: sub._id,
        subjectName: sub.subjectName,
        percent: (completed / total) * 100,
      };
    });
    res.json(subjectsToSend);
  } catch (error) {
    console.log("Error: get subjects : ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
