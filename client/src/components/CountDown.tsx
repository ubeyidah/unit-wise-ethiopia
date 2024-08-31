import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

const CountdownToSenea17 = () => {
  const targetDate = new Date(2025, 6, 25);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Card className="shadow-none rounded-md p-2 flex flex-wrap font-bold text-sm justify-evenly mb-4">
      <div className="transition-transform transform hover:scale-110 text-center">
        <p className="block text-xl">
          {timeLeft.days.toString().padStart(2, "0")}
        </p>
        <span className="text-xs font-normal">Days</span>
      </div>
      <Separator orientation="vertical" className="mx-2 h-14 " />
      <div className="transition-transform transform hover:scale-110 text-center">
        <p className="block text-xl">
          {timeLeft.hours.toString().padStart(2, "0")}
        </p>
        <span className="text-xs font-normal">Hours</span>
      </div>
      <Separator orientation="vertical" className="mx-2 h-14 " />
      <div className="transition-transform transform hover:scale-110 text-center">
        <p className="block text-xl">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </p>
        <span className="text-xs font-normal">Minutes</span>
      </div>
      <Separator orientation="vertical" className="mx-2 h-14 " />
      <div className="transition-transform transform hover:scale-110 text-center">
        <p className="block text-xl">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </p>
        <span className="text-xs font-normal">Seconds</span>
      </div>
    </Card>
  );
};

export default CountdownToSenea17;
