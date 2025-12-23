import { Metadata } from 'next';
import BlogsContent from '@/components/pages/blogs/BlogsContent';

export const metadata: Metadata = {
  title: 'Insights on AI & Digital Growth | Bidayalab Blog',
  description: 'Read the latest stories on Artificial Intelligence, Web Development, and Entrepreneurship. Learn how to scale your business with technology.',
  keywords: ['AI Blog', 'Web Development Tutorials', 'Digital Growth Strategies', 'Bidayalab Ideas'],
};

export default function BlogsPage() {
  return <BlogsContent />;
}