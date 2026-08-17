import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const HourlyForcastSkeleton = () => {
  return (
    <Card
      title="Hourly Forcast"
      className="text-center items-center"
      childrenClassName="flex gap-12 overflow-x-scroll"
    >
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <div key={index} className="flex flex-col gap-2 items-center">
            <Skeleton className="w-10 h-8" />
            <Skeleton className="size-6" />
            <Skeleton className="w-10 h-8" />
          </div>
        );
      })}
    </Card>
  );
};

export default HourlyForcastSkeleton;
