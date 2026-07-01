# BloodConnect Client

BloodConnect is a responsive blood donation platform for finding donors,
managing urgent requests, and supporting donation organizations.

## Live URL

Not deployed yet.

## Features

- Donor registration and login
- Better Auth email and password authentication
- Protected dashboard for donors, volunteers, and admins
- Role-based request and user management
- Pending request details and donation confirmation
- Donor search by blood group and location
- Stripe funding checkout and funding history
- Profile editing with avatar support
- Admin statistics and request-status chart
- Contact form on the landing page

## Run Locally

```bash
npm install
npm run dev
```

Copy `.env.local.example` to `.env.local` and add:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key
```

The client runs on `http://localhost:3000`.

## Packages Used

- next
- react
- @heroui/react
- better-auth
- react-toastify
- react-icons
- tailwindcss

## Admin Setup

Register a user first, then change that user's `role` to `admin` in MongoDB
Atlas. Other roles can be managed from the admin dashboard.

## Deployment

Deploy this repository to Vercel and add both client environment variables.
Set `NEXT_PUBLIC_SERVER_URL` to the deployed server URL.
