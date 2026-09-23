
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## MongoDB booking storage

1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` to your MongoDB Atlas or local MongoDB connection string.
3. Optionally set `MONGODB_DB` (defaults to `panditji`).

Submitted puja bookings are saved in the `pujaBookings` collection with a `pending` status and timestamps. Never commit `.env.local` or share its connection string.
