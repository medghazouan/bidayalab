import { Metadata } from 'next';
import BlogListingClient from './BlogListingClient';

export const metadata: Metadata = {
  title: 'Digital Transformation Insights & AI Strategy | BidayaLab Blog',
  description: 'Practical deep-dives into AI automation, digital transformation, and growth strategy for SMEs. Real insights from the BidayaLab team.',
  keywords: [
    'AI automation blog',
    'digital transformation insights',
    'web development tips',
    'SME growth strategy',
    'AI for small business',
    'Morocco tech blog',
  ],
  openGraph: {
    title: 'Digital Transformation Insights & AI Strategy | BidayaLab Blog',
    description: 'Practical deep-dives into AI automation, digital transformation, and growth strategy for SMEs.',
    url: 'https://www.bidayalab.com/blogs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bidayalab.com/blogs',
  },
};

export default function BlogPage() {
  return <BlogListingClient />;
}
