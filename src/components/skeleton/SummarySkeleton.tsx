import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const SummarySkeleton = () => {
  return (
    <Card title="Weather Summary" childrenClassName="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="w-36 h-6" />

        <Skeleton className="w-36 h-6" />
      </div>

      <div className="flex justify-between gap-2">
        <Skeleton className="w-36 h-6" />
        <Skeleton className="size-8 rounded-full" />
      </div>

      <Skeleton className="w-36 h-6" />
      <div>
        <h2 className="text-center font-semibold text-amber-300">
          Wind Condition
        </h2>
        <div className="flex justify-around">
          <p>
            Wind Speed: <Skeleton className="w-36 h-6" />
          </p>
          <p>
            Wind Deg: <Skeleton className="w-36 h-6" />
          </p>
          <p>
            Wind Gust: <Skeleton className="w-36 h-6" />
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SummarySkeleton;
