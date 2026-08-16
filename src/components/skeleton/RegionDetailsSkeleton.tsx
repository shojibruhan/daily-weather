import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const RegionDetailsSkeleton = () => {
  return (
    <Card title="Region Details" className="text-center">
      <CardTitle className="text-2xl font-semibold">Region Details</CardTitle>
      <CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border rounded-lg p-4 h-16"
              >
                <Skeleton className=" size-6" />
                <div className="text-left">
                  <Skeleton className="w-full" />
                  <Skeleton />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default RegionDetailsSkeleton;
