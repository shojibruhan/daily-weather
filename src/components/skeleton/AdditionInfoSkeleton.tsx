import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const AdditionInfoSkeleton = () => {
  return (
    <Card
      title="Addition Weather Info"
      childrenClassName="flex flex-col justify-between md:h-56 gap-8"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="flex justify-between py-1" key={index}>
          <Skeleton className="w-30 h-6" />

          <span>
            <Skeleton className="w-30 h-6" />
          </span>
        </div>
      ))}
    </Card>
  );
};

export default AdditionInfoSkeleton;
