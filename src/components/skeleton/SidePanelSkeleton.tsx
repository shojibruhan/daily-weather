import { Skeleton } from "../ui/skeleton";
import SideCardSkeleton from "./SideCardSkeleton";

const SidePanelSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold pt-5">Air Pollution</h1>
      <Skeleton className="size-10" />
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
      </div>
      {Array.from({ length: 8 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SidePanelSkeleton;
