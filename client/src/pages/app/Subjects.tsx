import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSubjects, SubjectsType } from "@/apis/dashboard/subjects.api";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import { subjectIcons } from "@/data/dashboard";

export const loader: LoaderFunction = async (): Promise<SubjectsType[]> => {
  return await getSubjects();
};

const Subjects = () => {
  const subjects = useLoaderData() as SubjectsType[];
  return (
    <section className="min-h-full pb-9">
      <h1 className="text-xl md:text-3xl mt-2 text-green-500">
        Explore Your Subjects and Start Learning Today
      </h1>
      <p className="text-sm mt-1 mb-6">
        Browse our comprehensive list of subjects, with structured chapters from
        all grades, and embark on your educational journey with organized
        chapters.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {subjects.map((subject) => {
          const name =
            subject.subjectName.toLowerCase() as keyof typeof subjectIcons;
          return (
            <Link to={subject.subjectName} key={subject._id}>
              <Card className="rounded-md shadow-none p-4 hover:opacity-70 flex items-center w-full gap-4">
                <div className="bg-green-500/30 p-4 rounded-full">
                  {subjectIcons[name]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg uppercase">{subject.subjectName}</h3>
                    <p className="text-xs">{subject.total}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1">{subject.percent}%</p>
                    <Progress value={subject.percent} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Subjects;
