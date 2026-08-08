import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const SideCardSkeleton = () => {
  return (
    <Card className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to sidebar-accent/60 gap-0!">
      <div className="flex justify-between h-10">
        <Skeleton className="w-12 h-7 bg-muted" />
        <Skeleton className="w-12 h-7 bg-muted" />
      </div>
      <Skeleton className="w-full h-1.5" />

      <div className="flex justify-between text-xs mt-2">
        <Skeleton className="w-2 h-4 bg-muted" />
        <Skeleton className="w-2 h-4 bg-muted" />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="w-15 h-6 bg-muted" />
        ))}
      </div>
    </Card>
  );
};

export default SideCardSkeleton;
