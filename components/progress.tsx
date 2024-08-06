"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const calculatePercentage = (heuredebut: string, heurefin: string): number => {
  const [hoursDebut, minutesDebut] = heuredebut.split(":").map(Number);
  const [hoursFin, minutesFin] = heurefin.split(":").map(Number);

  const debutInMinutes = hoursDebut * 60 + minutesDebut;
  const finInMinutes = hoursFin * 60 + minutesFin;

  const now = new Date();
  const nowInMinutes = now.getHours() * 60 + now.getMinutes();

  if (nowInMinutes < debutInMinutes) {
    return 0;
  }

  if (nowInMinutes >= finInMinutes) {
    return 100;
  }

  const totalDuration = finInMinutes - debutInMinutes;
  const elapsedDuration = nowInMinutes - debutInMinutes;

  const percentage = (elapsedDuration / totalDuration) * 100;

  return percentage;
};

interface PlanningProgressProps {
  heuredebut: string;
  heurefin: string;
}

const PlanningProgress: React.FC<PlanningProgressProps> = ({
  heuredebut,
  heurefin,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [heureactuelle, setHeure] = useState<string>("00:00");
  const [hoursDebut, minutesDebut] = heuredebut.split(":").map(Number);
  const [hoursFin, minutesFin] = heurefin.split(":").map(Number);

  useEffect(() => {
    const updateProgress = () => {
      const newProgress = calculatePercentage(heuredebut, heurefin);
      setProgress(newProgress);
      setHeure(new Date().toLocaleTimeString());
    };

    // Call the function immediately on mount
    updateProgress();

    // Set up an interval to update every minute
    const intervalId = setInterval(updateProgress, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [heuredebut, heurefin]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Progress className="h-2" value={Number(progress)} />
              {/* {progress.toFixed(0)}% */}
            </TooltipTrigger>
            <TooltipContent>
              <p>il est : {heureactuelle}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full flex justify-between text-sm ">
        <span>
          {hoursDebut < 10 ? `0${hoursDebut}` : hoursDebut}:
          {minutesDebut < 10 ? `0${minutesDebut}` : minutesDebut}
        </span>
        <span>
          {hoursFin < 10 ? `0${hoursFin}` : hoursFin}:
          {minutesFin < 10 ? `0${minutesFin}` : minutesFin}
        </span>
      </div>
    </div>
  );
};

export default PlanningProgress;
