import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Opportunity } from '@/types/job.type';

export default function JobCard({ job }: { job: Opportunity }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-6 rounded-3xl bg-card/10 hover:shadow-md transition cursor-pointer">
        <CardContent className="p-0">
          <div className="flex gap-4 items-start">
            {/* Org Logo */}
            <Avatar className="w-14 h-14">
              <AvatarImage src={job.logoUrl} alt={job.orgName} />
              <AvatarFallback>
                {job.orgName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="w-full">
              {/* Job Title */}
              <h2 className="text-xl font-semibold">{job.title}</h2>

              {/* Organization + Location */}
              <p className="text-muted-foreground text-sm mt-1">
                {job.orgName} • {job.location?.join(', ')}
              </p>

              {/* Description */}
              <p className="mt-4 text-gray-700 line-clamp-3">
                {job.description}
              </p>

              {/* Categories + Required Skills */}
              <div className="flex flex-wrap gap-2 mt-5">
                {/* Categories */}
                {job.categories?.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="rounded-xl px-3 py-1 text-xs border flex items-center gap-1"
                  >
                    {cat}
                  </Badge>
                ))}

                {/* Required Skills */}
                {job.requiredSkills?.slice(0, 3).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="rounded-xl px-3 py-1 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Paid or Unpaid */}
              <div className="mt-4">
                {job.isPaid ? (
                  <Badge className="rounded-xl px-3 py-1 text-xs bg-green-600 text-white">
                    Paid • {job.paymentOption.currency} (
                    {job.paymentOption.paymentType})
                  </Badge>
                ) : (
                  <Badge className="rounded-xl px-3 py-1 text-xs bg-gray-300 text-gray-700">
                    Unpaid
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
