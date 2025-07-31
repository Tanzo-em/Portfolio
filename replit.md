# Portfolio Website

## Overview

This is a modern TypeScript portfolio website with 3D animated skill icons, smooth animations, and PostgreSQL-backed contact form. Built as a full-stack application showcasing a developer's skills and contact information. Features include React frontend with a sleek dark theme, professional tech icons with 3D hover effects, animated particles background, and Express.js backend with PostgreSQL database for contact form submissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme and animations
- **UI Components**: Radix UI components via shadcn/ui library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for request/response validation
- **Development**: Vite for hot module replacement and fast builds

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Contacts Table**: Contact form submissions (id, name, email, subject, message, createdAt)
- **Database**: PostgreSQL with Neon serverless driver

## Key Components

### Frontend Components
1. **Navigation**: Fixed navigation bar with smooth scrolling to sections
2. **Hero Section**: Animated typing effect and call-to-action buttons
3. **About Section**: Developer introduction with downloadable resume functionality
4. **Skills Section**: Interactive skill cards with hover effects
5. **Contact Section**: Form with real-time validation and submission feedback

### Backend Services
1. **Storage Layer**: Database abstraction with interface-based design
2. **API Routes**: RESTful endpoints for contact form submissions
3. **Middleware**: Request logging and error handling

### UI/UX Features
- Dark theme with cyan accent colors
- Smooth scroll animations and particle background effects
- Responsive design for mobile and desktop
- Toast notifications for user feedback
- Loading states and error handling

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form
   - React Hook Form validates input with Zod schema
   - Form data sent to `/api/contact` endpoint
   - Backend validates and stores in PostgreSQL
   - Success/error feedback displayed via toast notifications

2. **Contact Retrieval** (Admin):
   - GET request to `/api/contacts`
   - Database query returns all contact submissions
   - Data formatted and returned as JSON

## External Dependencies

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database
- **Connection**: WebSocket-based connection with connection pooling

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESLint/Prettier**: Code formatting and linting
- **Drizzle Kit**: Database migrations and schema management

### UI Libraries
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Assets**: Static files served from build directory

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema deployment

### Production Considerations
- Express serves static files in production
- Database migrations handled via Drizzle Kit
- Error handling with proper HTTP status codes
- Request logging for API endpoints