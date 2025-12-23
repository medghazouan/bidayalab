import Script from 'next/script';

export default function GlobalSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://bidayalab.com/#organization",
                "name": "Bidayalab",
                "url": "https://bidayalab.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://bidayalab.com/assets/icons/logo.png",
                    "width": 112,
                    "height": 112
                },
                "sameAs": [
                    "https://www.linkedin.com/company/bidayalab",
                    "https://www.instagram.com/bidayalab"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-555-000-0000",
                    "contactType": "customer service",
                    "areaServed": ["US", "AE", "SA"],
                    "availableLanguage": ["en", "ar"]
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://bidayalab.com/#website",
                "url": "https://bidayalab.com",
                "name": "Bidayalab",
                "description": "Premier AI Automation & Digital Transformation Agency",
                "publisher": {
                    "@id": "https://bidayalab.com/#organization"
                },
                "inLanguage": "en-US"
            }
        ]
    };

    return (
        <Script
            id="global-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            strategy="afterInteractive"
        />
    );
}
