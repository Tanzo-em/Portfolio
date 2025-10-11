# Vercel Deployment Guide

## Overview
This project is a full-stack portfolio application with:
- **Frontend**: React + Vite (static files)
- **Backend**: Express.js API routes (Vercel serverless functions)
- **Database**: PostgreSQL with Drizzle ORM

## Required Environment Variables

Add these environment variables in your Vercel dashboard:

### Database
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### Email Configuration (for contact form)
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

## Deployment Steps

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will automatically detect it's a Vite project

2. **Set Environment Variables**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add the variables listed above

3. **Database Setup**
   - Set up a PostgreSQL database (recommended: Neon, Supabase, or Vercel Postgres)
   - Run database migrations: `npm run db:push`
   - Copy the connection string to `DATABASE_URL`

4. **Email Setup**
   - For Gmail, enable 2-factor authentication
   - Generate an App Password
   - Use your Gmail address and app password for `EMAIL_USER` and `EMAIL_PASS`

5. **Deploy**
   - Push your changes to the main branch
   - Vercel will automatically build and deploy

## Build Configuration

The project uses:
- **Build Command**: `npm run build` (builds only the frontend)
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

## API Routes

The following API routes are available:
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (for admin use)

## Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes: `npm run check`

2. **API Routes Not Working**
   - Verify environment variables are set
   - Check database connection
   - Review Vercel function logs

3. **Static Files Not Loading**
   - Ensure `vercel.json` is correctly configured
   - Check that build output goes to `dist/public`

4. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Ensure database is accessible from Vercel
   - Check if database migrations have been run

### Local Testing

To test locally:
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the built files
npx serve dist/public
```

## File Structure

```
├── api/                 # Vercel serverless functions
│   ├── contact.ts      # Contact form handler
│   └── contacts.ts     # Get contacts handler
├── client/             # React frontend
├── server/             # Express server (for local dev)
├── shared/             # Shared types and schemas
├── dist/               # Build output
│   └── public/         # Static files for Vercel
└── vercel.json         # Vercel configuration
```
