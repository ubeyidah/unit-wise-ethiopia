import UserSubjects from "../models/userSubjects.model.js";
import { naturalSubjects, socialSubjects } from "../data/subjects.js";
import { subjectMarkSchema } from "../schemas/subject.schema.js";

export const getSubjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const subjects = await UserSubjects.find({ userId });
    const subjectsToSend = subjects.map((sub) => {
      let completed = 0;
      const total = sub.subjectProgress.length;
      sub.subjectProgress.forEach((progress) => {
        if (progress.isComplete) completed++;
      });
      return {
        _id: sub._id,
        subjectName: sub.subjectName,
        total: total,
        percent: Math.round((completed / total) * 100),
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

export const makeCompleteChapters = async (req, res) => {
  try {
    const { subject } = req.params;
    const { _id } = req.user;
    const { chapter, value } = req.body;
    const { error } = subjectMarkSchema.validate({ chapter, value });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const subjectDoc = await UserSubjects.findOne({
      userId: _id,
      subjectName: subject,
    });

    subjectDoc.subjectProgress = subjectDoc.subjectProgress.map((subj) => {
      if (subj.chapter == chapter) {
        return { ...subj, isComplete: value };
      } else {
        return subj;
      }
    });
    await subjectDoc.save();

    res.status(200).json({ message: "greate progress" });
  } catch (error) {
    console.log("Error: mark subjects : ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
