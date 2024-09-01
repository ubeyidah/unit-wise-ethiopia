import CountdownToSenea17 from "@/components/CountDown";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ethDateTime } from "@/lib/calendar";
import { useEffect, useState } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { CiCalendarDate } from "react-icons/ci";
import { Card } from "@/components/ui/card";
import { announcement } from "@/data/dashboard";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const chartConfig = {
  desktop: {
    label: "progress",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const ethioDate = `${ethDateTime.month}/${ethDateTime.date}/${ethDateTime.year}`;
  const [date, setDate] = useState<Date | undefined>(new Date(ethioDate));

  useEffect(() => {
    const display: Element | null = document?.querySelector(
      "#react-day-picker-2"
    );
    if (display) {
      display.textContent = ethDateTime.toDateString();
    }
  });
  const chartData = [
    { subjects: "Math", progress: 99 },
    { subjects: "Physics", progress: 77 },
    { subjects: "Chemistry", progress: 34 },
    { subjects: "Biology", progress: 44 },
    { subjects: "English", progress: 74 },
  ];
  return (
    <section className="min-h-full flex max-md:flex-col">
      <div className="w-full lg:w-[70%]"></div>
      <div className="w-full lg:w-[30%]">
        <div>
          <div className="flex justify-between items-center py-1 px-1">
            <h3>Calendar</h3>
            <CiCalendarDate />
          </div>
          <Separator className="mb-3" />
          <div className="cla">
            <Calendar
              mode="single"
              selected={date}
              className="rounded-md border w-full"
              defaultMonth={date}
              onSelect={setDate}
            />
          </div>
        </div>
        <div className="cd">
          <div className="flex justify-between items-center py-1 px-1 mt-4">
            <h3>Announcement</h3>
            <TfiAnnouncement />
          </div>
          <Separator className="mb-3" />
          <CountdownToSenea17 />
          {announcement.map((ann) => (
            <Card
              key={ann.id}
              className="p-2 shadow-none rounded-md mb-3 bg-muted/40"
            >
              <p className="text-sm">{ann.message}</p>
              <p className="text-right text-xs mr-1">{ann.date}</p>
            </Card>
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center py-1 px-1">
            <h3>Your progress</h3>
            <GiProgression />
          </div>
          <Separator className="mb-3" />
        </div>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subjects"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="progress"
              fill="var(--color-desktop)"
              className="max-w-6"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </section>
  );
};

export default Dashboard;
