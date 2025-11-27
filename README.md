# BidayaLab - Digital Agency Platform

A modern, full-featured digital agency platform built with Next.js 15, featuring a secure admin dashboard, project showcase, and client management system.

## Features

- 🎨 **Project Showcase** - Display projects across 5 categories (Creative Studio, Digital Development, AI Automation, Digital Marketing, Visual Storytelling)
- 🔐 **Secure Admin Dashboard** - Full CRUD operations for projects, blogs, testimonials, and pricing
- 📧 **Contact & Order Management** - Handle client inquiries and service orders
- 🎯 **SEO Optimized** - Server-side rendering with Next.js for optimal performance
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🌙 **Modern UI** - Dark theme with glassmorphism and smooth animations

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Authentication**: NextAuth v5
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd bidayalab-dev
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory (see `.env.example` for required variables)

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

See `.env.example` for all required environment variables. Key variables include:

- `MONGODB_URI` - Your MongoDB connection string
- `AUTH_SECRET` - Secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your application URL
- Email configuration for Resend/Nodemailer

## Project Structure

\`\`\`
bidayalab-dev/
├── app/                    # Next.js app directory
│   ├── (website)/         # Public-facing pages
│   ├── dashboard/         # Admin dashboard
│   ├── api/              # API routes
│   └── actions/          # Server actions
├── components/            # React components
│   ├── dashboard/        # Dashboard components
│   ├── sections/         # Page sections
│   └── projects/         # Project display components
├── lib/                  # Utility functions
├── models/               # Mongoose models
├── public/               # Static assets
└── styles/               # Global styles
\`\`\`

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Security

- Authentication with NextAuth v5
- Protected API routes
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- Secure file uploads with type and size validation

## License

Private - All rights reserved

## Support

For support, email: support@bidayalab.com
