export default function GlobalSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.bidayalab.com/#organization",
                "name": "BidayaLab",
                "url": "https://www.bidayalab.com",
                "description": "We help ambitious startups and SMEs scale with AI automation, custom web development, and visual storytelling.",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.bidayalab.com/assets/icons/logo.svg",
                    "width": 112,
                    "height": 112
                },
                "sameAs": [
                    "https://www.linkedin.com/company/bidayalab",
                    "https://www.instagram.com/bidayalab"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "email": "hello@bidayalab.com",
                    "areaServed": ["MA", "US", "AE", "SA"],
                    "availableLanguage": ["en"]
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Marrakech",
                    "addressCountry": "MA"
                },
                "foundingLocation": {
                    "@type": "Place",
                    "name": "Marrakech, Morocco"
                },
                "slogan": "Together, We Build Your Digital Future"
            },
            {
                "@type": "WebSite",
                "@id": "https://www.bidayalab.com/#website",
                "url": "https://www.bidayalab.com",
                "name": "BidayaLab",
                "description": "Digital Transformation Agency for SMEs | AI Automation, Web Development & Visual Storytelling",
                "publisher": {
                    "@id": "https://www.bidayalab.com/#organization"
                },
                "inLanguage": ["en"]
            },
            {
                "@type": "ProfessionalService",
                "@id": "https://www.bidayalab.com/#service",
                "name": "BidayaLab Digital Services",
                "description": "AI-powered automation, custom web development, and premium visual storytelling for ambitious businesses.",
                "url": "https://www.bidayalab.com/",
                "provider": {
                    "@id": "https://www.bidayalab.com/#organization"
                },
                "serviceType": [
                    "AI Automation",
                    "Web Development",
                    "Visual Storytelling",
                    "Digital Transformation",
                    "Business Automation"
                ],
                "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 31.6295,
                        "longitude": -7.9811
                    },
                    "geoRadius": "10000"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Digital Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "AI Automation",
                                "description": "Intelligent chatbots, workflow automation, and AI-powered systems that work 24/7."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Web Development",
                                "description": "Custom websites and web applications built with cutting-edge technology."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Visual Storytelling",
                                "description": "Premium video production and photography that captures your brand essence."
                            }
                        }
                    ]
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
