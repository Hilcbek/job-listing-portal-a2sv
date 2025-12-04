import { getSingleJob } from '@/actions/job.action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { singleJobReponse } from '@/types/job.type';
import { Separator } from '@radix-ui/react-separator';
import { IconArrowBack } from '@tabler/icons-react';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobSinglePage({ params }: Props) {
  const { id } = await params;
  const response: singleJobReponse = await getSingleJob(id);
  const data = response.data;

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT MAIN CONTENT */}
      <div className="lg:col-span-2 space-y-8">
        {/* TITLE */}
        <div className="flex items-center justify-start gap-1">
          <Button variant="ghost" asChild>
            <Link href="/jobs">
              <IconArrowBack />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{data.title}</h1>
        </div>

        {/* ORGANIZATION INFO */}
        <div className="flex items-center gap-4">
          {data.logoUrl && (
            <Image
            width={50}
            height={50}
              src={data.logoUrl}
              alt={data.orgName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold">{data.orgName}</p>
            <p className="text-gray-500">{data.orgEmail}</p>
            <p className="text-gray-500">{data.orgPrimaryPhone}</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">{data.description}</p>
        </div>

        {/* RESPONSIBILITIES */}
        {data.responsibilities && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
            <p className="text-gray-700">{data.responsibilities}</p>
          </div>
        )}

        {/* REQUIREMENTS */}
        {data.requirements && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <p className="text-gray-700">{data.requirements}</p>
          </div>
        )}

        {/* IDEAL CANDIDATE */}
        {data.idealCandidate && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Ideal Candidate</h2>
            <p className="text-gray-700">{data.idealCandidate}</p>
          </div>
        )}

        {/* PERKS & BENEFITS */}
        {data.perksAndBenefits && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Perks & Benefits</h2>
            <p className="text-gray-700">{data.perksAndBenefits}</p>
          </div>
        )}

        {/* QUESTIONS */}
        {data.questions && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Questions</h2>
            <p className="text-gray-700">{data.questions}</p>
          </div>
        )}

        {/* WHEN & WHERE */}
        <div>
          <h2 className="text-xl font-semibold mb-2">When & Where</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" /> {data.whenAndWhere}
          </p>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6 border-l pl-6">
        <h2 className="text-xl font-semibold">Job Details</h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-400">Posted On</p>
              <p className="font-medium">{data.datePosted}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-400">Deadline</p>
              <p className="font-medium">{data.deadline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="font-medium">{data.location?.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-400">Applicants</p>
              <p className="font-medium">{data.applicantsCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-xs text-gray-400">Start Date</p>
              <p className="font-medium">{data.startDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-pink-500" />
            <div>
              <p className="text-xs text-gray-400">End Date</p>
              <p className="font-medium">{data.endDate}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* CATEGORIES */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="flex gap-2 flex-wrap">
            {data.categories?.map((cat, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* REQUIRED SKILLS */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Required Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {data.requiredSkills?.map((skill, index) => (
              <Badge key={index} className="rounded-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* ENGAGEMENT & PAYMENT */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Engagement & Payment</h2>
          <p className="text-gray-700">Type: {data.engagementType}</p>
          <p className="text-gray-700">
            Payment: {data?.paymentOption?.paymentType} (
            {data?.paymentOption?.currency})
          </p>
          <p className="text-gray-700">Paid: {data.isPaid ? 'Yes' : 'No'}</p>
        </div>

        {/* REVIEWS */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Reviews</h2>
          <p className="text-gray-700">
            Average Rating: {data.average_rating} ({data.total_reviews} reviews)
          </p>
        </div>

        {/* STATUS */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Status</h2>
          <p className="text-gray-700">{data.status}</p>
        </div>
      </aside>
    </div>
  );
}
