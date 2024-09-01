import { naturalSubjects, socialSubjects } from "../data/subjects.js";
import UserSubjects from "../models/userSubjects.model.js";

export const enrollSubjects = async (studyType, id, res) => {
  try {
    if (!studyType)
      return res.status(400).json({ message: "studyType not identified" });
    if (studyType == "natural") {
      const mathSetup = naturalSubjects.math.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const physicsSetup = naturalSubjects.physics.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const biologySetup = naturalSubjects.biology.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const englishSetup = naturalSubjects.english.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const chemistrySetup = naturalSubjects.chemistry.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      Promise.all([
        await UserSubjects({
          userId: id,
          subjectName: "math",
          subjectProgress: mathSetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "physics",
          subjectProgress: physicsSetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "biology",
          subjectProgress: biologySetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "english",
          subjectProgress: englishSetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "chemistry",
          subjectProgress: chemistrySetup,
        }).save(),
      ]);
    } else if (studyType == "social") {
      const mathSetup = socialSubjects.math.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const historySetup = socialSubjects.history.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const economicsSetup = socialSubjects.economics.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const englishSetup = socialSubjects.english.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      const geographySetup = socialSubjects.geography.map((ma) => {
        return { chapter: ma.chapter, isComplete: false };
      });
      Promise.all([
        await UserSubjects({
          userId: id,
          subjectName: "math",
          subjectProgress: mathSetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "history",
          subjectProgress: historySetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "economics",
          subjectProgress: economicsSetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "english",
          subjectProgress: englishSetup,
        }).save(),
        await UserSubjects({
          userId: id,
          subjectName: "geography",
          subjectProgress: geographySetup,
        }).save(),
      ]);
    }
  } catch (error) {
    console.log("faild to enroll subjects", error.message);
    res.status(400).json({ message: "faild to enroll subjects" });
  }
};
