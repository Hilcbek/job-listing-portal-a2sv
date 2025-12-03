import { getSingleJob } from '@/actions/job.action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';
import { IconArrowBack } from '@tabler/icons-react';
import { CalendarDays, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobSinglePage({ params }: Props) {
  const { id } = await params;
  const data = await getSingleJob(id);

  return (
    <div className="container max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT MAIN CONTENT */}
      <div className="lg:col-span-2 space-y-8">
        {/* TITLE */}
        <div className="flex items-center justify-start gap-1">
          <Button variant={'ghost'} asChild>
            <Link href={'/jobs'}>
              <IconArrowBack />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{data.title}</h1>
        </div>

        {/* DESCRIPTION */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">{data.description}</p>
        </div>

        {/* RESPONSIBILITIES */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
          <ul className="space-y-2">
            {data.responsibilities?.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 w-5 h-5 mt-0.5" />
                <p className="text-gray-700">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* IDEAL CANDIDATE */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Ideal Candidate We Want
          </h2>

          <p className="font-semibold text-gray-800">
            Young ({data.ideal_candidate.age}) {data.ideal_candidate.gender}{' '}
            Social Media Manager
          </p>

          <ul className="space-y-2 mt-2">
            {data.ideal_candidate.traits?.map(
              (trait: string, index: number) => (
                <li key={index} className="text-gray-700 flex gap-2">
                  <CheckCircle2 className="text-blue-500 w-4 h-4 mt-1" />
                  <span>{trait}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* WHEN & WHERE */}
        <div>
          <h2 className="text-xl font-semibold mb-2">When & Where</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" /> {data.when_where}
          </p>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6 border-l pl-6">
        <h2 className="text-xl font-semibold">About</h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-400">Posted On</p>
              <p className="font-medium">{data.about.posted_on}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-400">Deadline</p>
              <p className="font-medium">{data.about.deadline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="font-medium">{data.about.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xs text-gray-400">Start Date</p>
              <p className="font-medium">{data.about.start_date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-xs text-gray-400">End Date</p>
              <p className="font-medium">{data.about.end_date}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* CATEGORIES */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="flex gap-2 flex-wrap">
            {data.about.categories.map((cat: string, index: number) => (
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
            {data.about.required_skills.map((skill: string, index: number) => (
              <Badge key={index} className="rounded-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
