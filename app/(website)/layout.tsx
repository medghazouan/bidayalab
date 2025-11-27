import dynamic from 'next/dynamic';

// Dynamically import components to reduce initial bundle size
const Navbar = dynamic(() => import('@/components/sections/Navbar'), {
    ssr: true,
});

const Footer = dynamic(() => import('@/components/sections/Footer'), {
    ssr: true,
});

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
