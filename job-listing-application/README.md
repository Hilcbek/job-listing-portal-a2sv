Job Listing Application
Overview

This is a Job Listing Application built with Next.js (App Router), TypeScript, and Shadcn UI components. It provides a fully server-rendered experience for browsing and searching job postings. The project focuses on clean architecture, type safety, and modern React patterns.

Features Implemented
1. Job Listings

Fetches all job postings from a dummy JSON file using a server function (getJobs).

Displays job title, description, company, responsibilities, and other details.

Fully typed using TypeScript for safety and autocompletion.

2. Single Job Page

Server component fetches a single job by ID using getSingleJob.

Handles the case when a job is not found with proper error messages.

Displays detailed information including responsibilities, company info, and required skills.

3. Search Functionality

Users can search jobs by title, description, company, or required skills.

The search is handled server-side using query parameters.

Updates URL with ?search=... to allow bookmarking and sharing search results.

Search input built with Shadcn UI Input and Button, keeping the page mostly server-rendered.

4. Shadcn UI Components

Fully utilizes Shadcn UI components such as:

Input

Button

Dropdown Menu

Styling is consistent, responsive, and fully typed with TypeScript.

5. Axios & Type Safety

All server functions use axios to fetch data.

Proper error handling using axios.isAxiosError.

All responses are typed with TypeScript interfaces for predictable data structure.

Technology Stack

Next.js (App Router)

TypeScript

React

Shadcn UI

Axios

Server Components for data fetching

CSS Modules for styling (optional)

Project Structure

app/jobs/page.tsx — Jobs listing page with search.

app/jobs/[id]/page.tsx — Single job detail page.

actions/jobs.ts — Server functions (getJobs, getSingleJob).

utils/dummy.json — Mock job postings data.

components/JobSearch.tsx — Search input component using Shadcn UI.

Future Improvements

Pagination for job listings.

Sorting/filtering by categories, location, or skills.

Connect to a real backend API instead of dummy JSON.

Debounced search for better performance.

Authentication for posting jobs.

How to Run
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000

or 


Live demo -> https://a2sv-jobs.vercel.app/


git link -> https://github.com/Hilcbek/job-listing-portal-a2sv/tree/main/job-listing-application