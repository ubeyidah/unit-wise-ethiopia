import {
  FromType,
  getSubject,
  SubjectDetailType,
  SubTopicType,
  markSubject,
} from "@/apis/dashboard/subjects.api";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { IoCheckmarkOutline } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";
import SubjectDetailOverview from "@/components/dashboard/SubjectDetailOverview";

export type LoaderType = {
  subjectData: SubjectDetailType[];
  subjectName: string;
};
export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderType> => {
  const { subject } = params;
  return {
    subjectData: await getSubject(subject || ""),
    subjectName: subject || "",
  };
};
const SubjectDetail = () => {
  const data = useLoaderData() as LoaderType;
  const toggleAttached = data.subjectData.map((ta) => {
    return {
      ...ta,
      isOpen: false,
      progress: ta.progress.isComplete,
    };
  });
  const [subject, setSubject] = useState(toggleAttached);
  const [loading, setLoading] = useState<string[]>([]);
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    percent: 0,
  });
  useEffect(() => {
    const total = subject.length;
    let completed = 0;
    subject.forEach((subj) => {
      if (subj.progress) completed++;
    });
    const percent = Math.round((completed / total) * 100);
    setProgress({ completed, total, percent });
  }, [subject]);
  const toggle = (id: string) => {
    setSubject((prev) => {
      return prev.map((subject) => {
        if (subject.chapter == id) {
          return {
            ...subject,
            isOpen: !subject.isOpen,
          };
        } else {
          return subject;
        }
      });
    });
  };
  const toggleProgressInClient = (chapter: string, value: boolean) => {
    setSubject((prev) => {
      return prev.map((subj) => {
        if (subj.chapter == chapter) {
          return {
            ...subj,
            progress: value,
          };
        } else {
          return subj;
        }
      });
    });
    toggle(chapter);
  };
  const toggleProgress = async (chapter: string, value: boolean) => {
    try {
      const message = value ? "👍 It's okay!" : "👏 Great job!";
      const des = value
        ? "Take your time to study again. You've got this!"
        : "You're making amazing progress and taking one step closer to your matric exam.";
      setLoading((prev) => [...prev, chapter]);
      await markSubject(data.subjectName, {
        chapter,
        value: !value,
      });
      toggleProgressInClient(chapter, !value);
      toast.success(message, {
        description: des,
        className: "border",
        action: {
          label: <IoIosClose className="size-6 dark:text-white" />,
          onClick: () => null,
        },
      });
    } catch (error) {
      toast.error("Opps! No internet connection");
    } finally {
      setLoading((prev) => prev.filter((id) => id !== chapter));
    }
  };

  return (
    <section className="min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-3">
          <div className="md:sticky md:top-[80px] md:left-0 ">
            <SubjectDetailOverview data={data} progress={progress} />
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-col gap-3">
            {subject.map((item) => (
              <Card
                className={`rounded-md shadow-none ${
                  item.progress ? "border-green-500/40 bg-green-500/10" : ""
                }`}
                key={item.chapter}
              >
                <button
                  className="outline-none flex justify-between w-full p-4 gap-1 max-sm:text-sm"
                  onClick={() => toggle(item.chapter)}
                >
                  {/* left */}
                  <div className="flex items-center gap-3">
                    <h3 className="size-6 flex w-6 items-center justify-center rounded-full bg-green-600 text-white">
                      {item.progress ? <IoCheckmarkOutline /> : item.chapter}
                    </h3>
                    <p className="text-start flex-1">{item.title}</p>
                  </div>
                  {/* right */}
                  <div className="w-7">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-500/20 ">
                      <IoIosArrowDown
                        className={item.isOpen ? "rotate-180" : ""}
                      />
                    </span>
                  </div>
                </button>
                {item.isOpen && (
                  <div>
                    <Separator />
                    {loading.includes(item.chapter) ? (
                      <div className="text-sm flex items-center p-3 px-4 gap-4 bg-slate-400/10 dark:text-white text-black w-full justify-center">
                        <ImSpinner8 className="animate-spin" />
                      </div>
                    ) : (
                      <label
                        htmlFor={item.chapter}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center p-3 px-4 gap-4 select-none max-sm:text-xs"
                      >
                        <Checkbox
                          checked={item.progress}
                          id={item.chapter}
                          onCheckedChange={() =>
                            toggleProgress(item.chapter, item.progress)
                          }
                        />
                        {item.progress
                          ? "Chapter understood! Well done!"
                          : "Got it! I understand this chapter."}
                      </label>
                    )}
                    {(item.from && item?.from.length > 0) ||
                    (item.subTopics && item?.subTopics.length > 0) ? (
                      <FromTemp from={item.from} subTopics={item.subTopics} />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectDetail;

function FromTemp({
  from,
  subTopics,
}: {
  from: FromType[] | undefined;
  subTopics: SubTopicType[] | undefined;
}) {
  return (
    <>
      <Separator />

      <div className="p-3 flex flex-wrap gap-3">
        {from &&
          from.map((it, i) => (
            <div
              key={i + "rand"}
              className="p-1 text-sm max-sm:text-xs rounded-full dark:border-green-500/20 border px-4 border-green-500/40"
            >
              Grade {it.grade} at unit {it.unit}
            </div>
          ))}
        {subTopics &&
          subTopics.map((topic, i) => (
            <div key={i + "uniqe"}>
              {topic.name && <h3 className="mb-2"># {topic.name}</h3>}
              <div className="flex gap-3 flex-wrap items-center">
                {topic.child &&
                  topic.child.map((chi) => (
                    <div
                      key={chi}
                      className="p-1 text-sm max-sm:text-xs rounded-full border-green-500/20 border px-4"
                    >
                      {chi}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
