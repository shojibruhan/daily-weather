import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

const WeatherInfoSkeleton = () => {
  return (
    <Card title="Details" childrenClassName="flex flex-col items-center ">
      Country Name: <Skeleton className="w-30 h-4" />
      <div className="flex flex-col items-center ">
        <Skeleton className="w-30 h-15" />
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-36 h-10" />
      </div>
      <div className="flex flex-col gap-2 text-center items-center">
        <p className="text-xl">Local Time:</p>
        <Skeleton className="w-30 h-4" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <Skeleton className="w-16 h-6" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <p>
            {" "}
            <Skeleton className="w-16 h-6" />
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind </p>
          <Skeleton className="w-16 h-6" />
        </div>
      </div>
    </Card>
  );
};

export default WeatherInfoSkeleton;
