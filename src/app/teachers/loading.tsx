import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card p-4 rounded-lg border space-y-4">
                    <Skeleton className="h-56 w-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                     <div className="flex flex-wrap gap-2 pt-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-1/4" />
                        <Skeleton className="h-10 w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
