# Deploying to Vercel

This guide will walk you through deploying your BidayaLab platform to Vercel.

## Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub account with your repository
- MongoDB Atlas database (or other MongoDB hosting)
- Your code pushed to a GitHub repository

## Step 1: Prepare Your Environment

1. Ensure all environment variables are documented in `env.example.txt`
2. Test your production build locally:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`
3. Fix any build errors before deploying

## Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js configuration

## Step 3: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Required Variables

\`\`\`
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_generated_secret
NEXTAUTH_URL=https://yourdomain.vercel.app
\`\`\`

### Email Configuration

Choose one of:

**Option 1: Resend (Recommended)**
\`\`\`
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
\`\`\`

**Option 2: SMTP**
\`\`\`
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
\`\`\`

## Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Monitor the deployment logs for any errors

## Step 5: Post-Deployment Checklist

- [ ] Test authentication (login/logout)
- [ ] Verify database connection
- [ ] Test file uploads
- [ ] Check email notifications
- [ ] Test all dashboard CRUD operations
- [ ] Verify contact form submissions
- [ ] Test order creation
- [ ] Check all public pages load correctly
- [ ] Test responsive design on mobile
- [ ] Verify SEO meta tags
- [ ] Check performance with Lighthouse

## Step 6: Set Up Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Wait for SSL certificate provisioning

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript errors locally first

### Database Connection Issues

- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access (allow Vercel IPs)
- Ensure database user has proper permissions

### Authentication Not Working

- Verify `AUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your deployment URL
- Ensure admin user exists in database

### File Uploads Failing

- File uploads to `/public/uploads` won't persist on Vercel
- Consider using a cloud storage service (AWS S3, Cloudinary)
- Update `FileUpload` component to use cloud storage API

## Production Optimizations

### Recommended: Use Cloud Storage

Vercel's filesystem is read-only in production. For file uploads, integrate:
	- **Cloudinary**: Image/video CDN
- **AWS S3**: General file storage
- **Vercel Blob**: Vercel's own storage solution

### Monitoring

Consider adding:
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay

##Security Reminders

- ✅ Never commit `.env.local` to version control
- ✅ Use strong, unique `AUTH_SECRET`
- ✅ Keep dependencies updated
- ✅ Monitor Vercel logs regularly
- ✅ Enable Vercel's DDoS protection
- ✅ Review security headers in `vercel.json`

## Continuous Deployment

Every push to your main branch will automatically deploy to production. To set up preview deployments for other branches, check your Vercel project settings.

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
