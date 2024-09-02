import {
  FromType,
  getSubject,
  SubjectDetailType,
  SubTopicType,
} from "@/apis/dashboard/subjects.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LoaderFunction, useLoaderData, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";

export const loader: LoaderFunction = async ({
  params,
}): Promise<SubjectDetailType[]> => {
  const { subject } = params;
  return await getSubject(subject || "");
};
const SubjectDetail = () => {
  const data = useLoaderData() as SubjectDetailType[];
  const toggleAttached = data.map((ta) => {
    return {
      ...ta,
      isOpen: false,
    };
  });
  const [subject, setSubject] = useState(toggleAttached);

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

  return (
    <section className="min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-3">
          <Card className="md:sticky md:top-[80px] md:left-0 rounded-md shadow-none max-h-72 h-full p-3">
            <div>
              <Link to="/dashboard/subjects">
                <Button variant="outline">
                  <GoArrowLeft />
                </Button>
              </Link>
            </div>
            asd
          </Card>
        </div>
        <div className="p-3">
          <div className="flex flex-col gap-3">
            {subject.map((item) => (
              <Card
                className={`rounded-md shadow-none ${
                  item.progress.isComplete
                    ? "border-green-500/40 bg-green-500/10"
                    : ""
                }`}
                key={item.chapter}
              >
                <button
                  className="outline-none flex justify-between w-full p-4 gap-1 max-sm:text-xs"
                  onClick={() => toggle(item.chapter)}
                >
                  {/* left */}
                  <div className="flex items-center gap-3">
                    <h3 className="size-6 flex w-6 items-center justify-center rounded-full bg-green-600 text-white">
                      {item.progress.isComplete ? (
                        <IoCheckmarkOutline />
                      ) : (
                        item.chapter
                      )}
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
                    <label
                      htmlFor={item.chapter}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center p-3 px-4 gap-4 select-none max-sm:text-xs"
                    >
                      <Checkbox
                        checked={item.progress.isComplete}
                        id={item.chapter}
                      />
                      I Understand this topic
                    </label>
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
          from.map((it) => (
            <div className="p-1 text-sm max-sm:text-xs rounded-full dark:border-green-500/20 border px-4 border-green-500/40">
              Grade {it.grade} at unit {it.unit}
            </div>
          ))}
        {subTopics &&
          subTopics.map((topic) => (
            <div>
              {topic.name && <h3 className="mb-2"># {topic.name}</h3>}
              <div className="flex gap-3 flex-wrap items-center">
                {topic.child &&
                  topic.child.map((chi) => (
                    <div className="p-1 text-sm max-sm:text-xs rounded-full border-green-500/20 border px-4">
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
