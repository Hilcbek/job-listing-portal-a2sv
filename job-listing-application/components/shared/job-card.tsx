import { JobPosting } from '@/types/job.type';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getCategoryStyle } from '@/utils/helper';
import Link from 'next/link';

export default function JobCard({ job }: { job: JobPosting }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-6 rounded-3xl bg-card/10 hover:shadow-md transition cursor-pointer">
        <CardContent className="p-0">
          <div className="flex gap-4 items-start">
            <Avatar className="w-14 h-14">
              <AvatarImage src={job.image} alt={job.title} />
              <AvatarFallback>
                {job.company?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="w-full">
              <h2 className="text-xl font-semibold">{job.title}</h2>

              <p className="text-muted-foreground text-sm mt-1">
                {job.company} • {job.about.location}
              </p>

              <p className="mt-4 text-gray-700 line-clamp-3">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {job.about.categories?.map((cat) => {
                  const { icon: Icon, className } = getCategoryStyle(cat);
                  return (
                    <Badge
                      key={cat}
                      variant="outline"
                      className={`rounded-xl px-3 py-1 text-xs flex items-center gap-1 border ${className}`}
                    >
                      <Icon size={13} />
                      {cat}
                    </Badge>
                  );
                })}

                {job.about.required_skills?.slice(0, 2).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-xl px-3 py-1 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
