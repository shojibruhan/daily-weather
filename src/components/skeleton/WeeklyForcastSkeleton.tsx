import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const WeeklyForcastSkeleton = () => {
  return (
    <Card title="This Week Forcast" className="text-center col-span-1">
      <div className="flex justify-between text-md mb-2 dark:text-amber-100 ">
        <p>Day</p>
        <p>Weather</p>
        <p>Max. Temp ℃</p>
        <p>Min. Temp ℃</p>
        <p>Humidity (%)</p>
        <p>Wind (m/s)</p>
      </div>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <div key={index} className="flex justify-between text-sm">
            <Skeleton className="w-6 h-4" />
            <Skeleton className="size-8" />
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-6 h-4" />
            <Skeleton className="w-6 h-4" />
          </div>
        );
      })}
    </Card>
  );
};

export default WeeklyForcastSkeleton;
