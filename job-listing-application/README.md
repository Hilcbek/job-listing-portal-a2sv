# Job Listing Platform 🚀

A modern job listing platform built with Next.js that connects job seekers with opportunities. This project was developed as part of the A2SV (Africa to Silicon Valley) program.

## What's This All About?

So basically, this is a full-stack job board where companies can post opportunities and job seekers can browse and apply. I built it using some pretty cool tech and tried to make the user experience as smooth as possible.

## Tech Stack

Here's what I used to build this thing:

- **Next.js 14** - The main framework (using App Router because, let's be honest, it's way better)
- **TypeScript** - For type safety and fewer bugs
- **NextAuth.js** - Handles all the authentication stuff
- **Prisma** - Database ORM (makes working with databases actually enjoyable)
- **Tailwind CSS** - For styling (utility-first CSS is life)
- **shadcn/ui** - Pre-built components that look great
- **Zod** - Schema validation
- **React Hook Form** - Form handling made easy
- **Vercel** - Deployment and CI/CD

## Features

### Authentication 🔐
- User signup with email verification (OTP-based)
- Secure login/logout
- Protected routes
- Session management with NextAuth
- Role-based access control

### Job Listings 📋
- Browse all available jobs
- Detailed job view with all the info you need
- Filter and search functionality
- Categories and required skills display
- Company information and ratings

### User Experience ✨
- Responsive design (works great on mobile too)
- Clean, modern UI
- Loading states and error handling
- Form validation on the client side
- Toast notifications for user feedback

## Project Structure

Here's how everything is organized:

```
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts        # NextAuth API routes
│   ├── jobs/
│   │   ├── page.tsx                # Job listings page
│   │   └── [id]/
│   │       └── page.tsx            # Single job detail page
│   ├── signup/
│   │   └── page.tsx                # User registration
│   ├── signin/
│   │   └── page.tsx                # User login
│   └── verify/
│       └── page.tsx                # Email verification
├── actions/
│   ├── auth.action.ts              # Authentication server actions
│   └── job.action.ts               # Job-related server actions
├── components/
│   ├── ui/                         # shadcn/ui components
│   └── ...                         # Custom components
├── lib/
│   ├── prisma.ts                   # Prisma client setup
│   └── utils.ts                    # Helper functions
├── schema/
│   └── auth.schema.ts              # Zod validation schemas
├── types/
│   ├── auth.type.ts                # Auth type definitions
│   └── job.type.ts                 # Job type definitions
└── auth.ts                         # NextAuth configuration
```

## Getting Started

### Prerequisites

Make sure you have these installed:
- Node.js (v18 or higher)
- npm or yarn or pnpm (I use pnpm)
- A database (PostgreSQL recommended)

### Installation

1. Clone the repo:
```bash
git clone <your-repo-url>
cd job-listing-platform
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up your environment variables:
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# API
NEXT_PUBLIC_API_URL="https://akil-backend.onrender.com"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` and you're good to go!

## How Authentication Works

The auth flow is pretty straightforward:

1. **Signup**: User fills out the form → We validate with Zod → Send data to A2SV backend → User gets an OTP via email
2. **Verification**: User enters OTP → We verify it → Account activated
3. **Login**: User enters credentials → Backend validates → We get an access token → Store it securely with NextAuth
4. **Protected Routes**: NextAuth middleware checks if user is authenticated before allowing access

### API Endpoints Used

All these endpoints are provided by the A2SV backend:

- `POST /signup` - Register new user
- `POST /verify-email` - Verify email with OTP
- `POST /login` - User login
- `GET /opportunities` - Fetch all jobs
- `GET /opportunities/:id` - Get single job details

## Key Implementation Details

### Server Actions
I'm using Next.js Server Actions for data fetching and mutations. They're in the `actions/` folder and make the code much cleaner than traditional API routes.

### Form Validation
All forms use React Hook Form + Zod for validation. This means we catch errors before hitting the server, which makes things faster and gives better user feedback.

### Type Safety
Everything is typed with TypeScript. The types are defined in the `types/` folder and used throughout the app.

### Security
- Passwords are never stored in the frontend
- Access tokens are handled by NextAuth
- All sensitive data is validated
- Protected routes require authentication

## Deployment

The app is deployed on Vercel with automatic deployments on every push to main:

- **CI/CD**: Automatic builds and deployments
- **Environment Variables**: Set in Vercel dashboard
- **Preview Deployments**: Every PR gets its own preview URL

## Screenshots & Pages

### 1. Signup Page
![Signup Page](./screenshots/signup.png)

**Description:**
The signup page features a clean, user-friendly form where new users can create their account. The form includes:
- Name input field
- Email address field
- Password field with strength indicator
- Confirm password field
- Role selection
- Form validation that checks all fields before submission
- Error messages display inline when validation fails
- Upon successful signup, users are redirected to the email verification page

The design follows the Figma reference provided, with proper spacing and a modern look. All inputs are validated on the client side using Zod schema validation before sending the request to the `/signup` endpoint.

---

### 2. Email Verification Page
![Email Verification](./screenshots/verify.png)

**Description:**
After signing up, users land on this verification page where they need to enter the OTP (One-Time Password) sent to their email. Features include:
- OTP input field (6-digit code)
- Clear instructions telling users to check their email
- Resend OTP button (in case they didn't receive it)
- Real-time validation of the OTP format
- Success message upon successful verification
- Automatic redirect to signin page after verification

This page uses the `/verify-email` endpoint with the user's email and OTP code to activate the account.

---

### 3. Signin Page
![Signin Page](./screenshots/signin.png)

**Description:**
The signin page allows registered users to access their accounts. It includes:
- Email input field
- Password input field
- "Remember me" checkbox option
- "Forgot password?" link (for future implementation)
- Clear error messages for invalid credentials
- Loading state during authentication
- Link to signup page for new users

When users submit their credentials, the form sends a POST request to the `/login` endpoint. Upon successful authentication, the access token is stored securely using NextAuth, and users are redirected to the jobs listing page. The page handles authentication failures gracefully by showing clear error messages.

---

### 4. Jobs Listing Page
![Jobs Page](./screenshots/jobs.png)

**Description:**
This is the main page where users can browse all available job opportunities. Features include:
- Grid layout of job cards showing key information
- Each card displays: job title, company name, location, and brief description
- Filter options by category, location, and engagement type
- Search functionality to find specific jobs
- Pagination for better performance with large datasets
- Responsive design that works on all screen sizes
- Loading skeletons while data is being fetched

Users can click on any job card to view the full details on the single job page.

---

### 5. Job Detail Page
![Job Detail](./screenshots/job-detail.png)

**Description:**
The job detail page provides comprehensive information about a selected job opportunity. The layout features:

**Left Column (Main Content):**
- Back button to return to jobs listing
- Full job title
- Company information with logo
- Detailed job description
- Responsibilities section
- Requirements and qualifications
- Ideal candidate profile
- Perks and benefits
- Application questions
- When and where (work arrangement details)

**Right Sidebar (Quick Info):**
- Posted date
- Application deadline
- Location
- Number of applicants
- Start and end dates
- Categories (as badges)
- Required skills (as tags)
- Engagement type (full-time, part-time, etc.)
- Payment information
- Company ratings and reviews
- Current status

The page fetches data from `/opportunities/:id` endpoint and displays everything in an organized, easy-to-read format. Users can see all the information they need to decide whether to apply for the position.

## Challenges I Faced

1. **NextAuth Configuration**: Getting NextAuth to work with the A2SV backend took some time. Had to create custom providers and handle the token management properly.

2. **Type Safety with Dynamic Data**: Making sure all the API responses were properly typed was tricky but worth it.

3. **Form Validation**: Balancing client-side validation with server-side errors required some thought.

## What I Learned

- Next.js App Router is powerful but has a learning curve
- Server Actions are amazing for simple mutations
- TypeScript makes refactoring so much easier
- Good error handling is crucial for user experience

## Future Improvements

If I had more time, I'd add:
- Job application functionality
- User profile management
- Bookmark/save jobs feature
- Advanced filtering and search
- Company dashboard for posting jobs
- Real-time notifications

## Contributing

Feel free to open issues or submit PRs if you find any bugs or have suggestions!

## License

MIT

## Acknowledgments

- **A2SV Team** for providing the backend API and mentorship
- **shadcn** for the amazing UI components
- **Vercel** for making deployment stupidly simple

---

Built with ☕ and lots of Stack Overflow visits