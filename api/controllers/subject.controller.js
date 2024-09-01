import UserSubjects from "../models/userSubjects.model.js";
import { naturalSubjects, socialSubjects } from "../data/subjects.js";

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
    res.status(200).json(subjectsToSend);
  } catch (error) {
    console.log("Error: get subjects : ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
export const getSubject = async (req, res) => {
  try {
    const { subject } = req.params;
    const { _id, studyType } = req.user;
    const subjectDoc = await UserSubjects.findOne({
      userId: _id,
      subjectName: subject,
    });

    if (studyType == "natural") {
      const naturalSubj = [
        "math",
        "physics",
        "chemistry",
        "biology",
        "english",
      ];
      if (!naturalSubj.includes(subject))
        return res.status(400).json({
          message:
            "Invalid subject name or you are not allowed to access social subjects",
        });
      const currentSubject = naturalSubjects[subject.toLowerCase()];
      const currentSubjectToSend = currentSubject.map((currentS, i) => {
        return {
          ...currentS,
          progress: subjectDoc.subjectProgress[i],
        };
      });
      return res.status(200).json(currentSubjectToSend);
    } else if (studyType == "social") {
      const socialSubj = [
        "math",
        "economics",
        "history",
        "geography",
        "english",
      ];
      if (!socialSubj.includes(subject))
        return res.status(400).json({
          message:
            "Invalid subject name or you are not allowed to access natural subjects",
        });
      const currentSubject = socialSubjects[subject.toLowerCase()];
      const currentSubjectToSend = currentSubject.map((currentS, i) => {
        return {
          ...currentS,
          progress: subjectDoc.subjectProgress[i],
        };
      });
      return res.status(200).json(currentSubjectToSend);
    }
  } catch (error) {
    console.log("Error: get subjects : ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
