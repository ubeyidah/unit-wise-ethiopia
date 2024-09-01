import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GiChemicalDrop } from "react-icons/gi";
import { TbMath } from "react-icons/tb";
import { SiGrammarly } from "react-icons/si";
import { Separator } from "@/components/ui/separator";

const Subjects = () => {
  return (
    <section className="min-h-full">
      Subjects
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        <Card className="rounded-md shadow-none p-4 flex items-center w-full gap-4">
          <div className="bg-green-500/30 p-3 rounded-full">
            <GiChemicalDrop className="size-8" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg uppercase">Chemistry</h3>
              <p className="text-xs">14</p>
            </div>
            <div>
              <p className="text-xs">49%</p>
              <Progress value={49} />
            </div>
          </div>
        </Card>
        <Card className="rounded-md shadow-none p-4 flex items-center w-full gap-4">
          <div className="bg-green-500/20 p-3 rounded-full">
            <TbMath className="size-8" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg uppercase">Maths</h3>
              <p className="text-xs">8</p>
            </div>
            <div>
              <p className="text-xs mb-1">9%</p>
              <Progress value={9} />
            </div>
          </div>
        </Card>
        <Card className="rounded-md shadow-none p-4 flex items-center w-full gap-4">
          <div className="bg-green-500/30 p-3 rounded-full">
            <SiGrammarly className="size-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg uppercase">English</h3>
              <p className="text-xs">11</p>
            </div>
            <div>
              <p className="text-xs">35%</p>
              <Progress value={35} />
            </div>
          </div>
        </Card>
        <Card className="rounded-md shadow-none p-4 flex items-center w-full gap-4">
          <div className="bg-green-500/30 p-3 rounded-full">
            <GiChemicalDrop className="size-8" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg uppercase">Chemistry</h3>
              <p className="text-xs">14</p>
            </div>
            <div>
              <p className="text-xs">49%</p>
              <Progress value={49} />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Subjects;
