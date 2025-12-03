import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT MAIN CONTENT */}
      <div className="lg:col-span-2 space-y-8">
        {/* TITLE */}
        <div className="flex items-center justify-start gap-1">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-8 w-72 rounded-lg" />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Skeleton className="h-6 w-40 mb-3 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 mt-2 rounded-md" />
          <Skeleton className="h-4 w-4/6 mt-2 rounded-md" />
        </div>

        {/* RESPONSIBILITIES */}
        <div>
          <Skeleton className="h-6 w-48 mb-3 rounded-md" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-4 w-2/3 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* IDEAL CANDIDATE */}
        <div>
          <Skeleton className="h-6 w-56 mb-2 rounded-md" />
          <Skeleton className="h-5 w-72 mb-3 rounded-md" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-md" />
                <Skeleton className="h-4 w-2/5 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* WHEN & WHERE */}
        <div>
          <Skeleton className="h-6 w-44 mb-3 rounded-md" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6 border-l pl-6">
        {/* ABOUT */}
        <Skeleton className="h-6 w-24 rounded-md" />

        <Card className="space-y-4 bg-background/60 border-none shadow-none">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-md" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            </div>
          ))}
        </Card>

        <Skeleton className="h-[1px] w-full opacity-40" />

        {/* CATEGORIES */}
        <div>
          <Skeleton className="h-6 w-28 mb-3 rounded-md" />
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>

        {/* REQUIRED SKILLS */}
        <div>
          <Skeleton className="h-6 w-32 mb-3 rounded-md" />
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-24 rounded-sm" />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
