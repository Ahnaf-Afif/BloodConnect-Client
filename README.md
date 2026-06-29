# BloodConnect Client

Frontend for the BloodConnect blood donation platform built with Next.js.

## Live URL

Add your deployed frontend URL here.

## Features

- Donor registration and login
- Protected dashboard for donors, volunteers, and admins
- Donation request creation, editing, and management
- Donor search by blood group and location
- Funding page with Stripe-style checkout flow
- Profile editing with avatar support
- Contact form on the landing page

## Run Locally

```bash
npm install
npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_key
```

## Packages Used

- next
- react
- react-toastify
- react-icons
- tailwindcss

## Admin Setup

To make a user an admin, update the user's role to `admin` in MongoDB.
