import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingJobCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="p-6 rounded-3xl bg-background/60 backdrop-blur-sm
          border border-border shadow-sm"
        >
          <CardContent className="p-0">
            <div className="flex gap-4 items-start">
              {/* Avatar Skeleton */}
              <Skeleton className="h-14 w-14 rounded-full" />

              {/* Text blocks */}
              <div className="w-full space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
                {/* Badges */}
                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-6 w-20 rounded-xl" />
                  <Skeleton className="h-6 w-16 rounded-xl" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
