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
                    "https://www.instagram.com/bidayalab",
                    "https://x.com/bidayalab",
                    "https://www.facebook.com/bidayalab",
                    "https://github.com/bidayalab",
                    "https://www.crunchbase.com/organization/bidayalab",
                    "https://www.behance.net/bidayalab"
                ],
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "contactType": "customer service",
                        "telephone": "+212-751-388-901",
                        "email": "support@bidayalab.com",
                        "areaServed": ["MA", "FR", "BE", "CH", "AE", "SA", "US", "CA", "GB"],
                        "availableLanguage": ["en", "fr", "ar"]
                    },
                    {
                        "@type": "ContactPoint",
                        "contactType": "sales",
                        "telephone": "+212-751-388-901",
                        "email": "hello@bidayalab.com",
                        "areaServed": ["MA", "FR", "BE", "CH", "AE", "SA", "US", "CA", "GB"],
                        "availableLanguage": ["en", "fr", "ar"]
                    }
                ],
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Marrakech",
                    "addressRegion": "Marrakech-Safi",
                    "postalCode": "40000",
                    "addressCountry": "MA"
                },
                "foundingLocation": {
                    "@type": "Place",
                    "name": "Marrakech, Morocco"
                },
                "foundingDate": "2023-01-01",
                "areaServed": [
                    { "@type": "Country", "name": "Morocco" },
                    { "@type": "Country", "name": "France" },
                    { "@type": "Country", "name": "United Arab Emirates" },
                    { "@type": "Country", "name": "Saudi Arabia" },
                    { "@type": "Country", "name": "United States" },
                    { "@type": "Country", "name": "Canada" },
                    { "@type": "Country", "name": "United Kingdom" }
                ],
                "knowsLanguage": ["en", "fr", "ar"],
                "knowsAbout": [
                    "AI automation",
                    "n8n workflow automation",
                    "OpenAI GPT-4 integration",
                    "Claude integration",
                    "Mistral AI integration",
                    "Next.js development",
                    "React engineering",
                    "Shopify Hydrogen",
                    "WordPress to Next.js migration",
                    "Core Web Vitals optimization",
                    "Headless CMS",
                    "Brand identity design",
                    "Motion design",
                    "Visual storytelling",
                    "SEO",
                    "GEO",
                    "AEO",
                    "Generative Engine Optimization",
                    "Answer Engine Optimization"
                ],
                "slogan": "Outcomes, not deliverables — we don't sell websites, we sell measurable growth.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5.0",
                    "reviewCount": "24"
                },
                "review": [
                    {
                        "@type": "Review",
                        "author": {
                            "@type": "Person",
                            "name": "Ahmed Benali"
                        },
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5"
                        },
                        "reviewBody": "From day one, they got what we were trying to do—make our brand feel accessible, human, and forward-looking. The rebrand has completely reshaped how we show up in the market."
                    },
                    {
                        "@type": "Review",
                        "author": {
                            "@type": "Person",
                            "name": "Sara Mansouri"
                        },
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5"
                        },
                        "reviewBody": "Working with Bidayalab was transformative. They understood our vision instantly and delivered beyond expectations. Our conversion rates have never been higher."
                    },
                    {
                        "@type": "Review",
                        "author": {
                            "@type": "Person",
                            "name": "Youssef El Amrani"
                        },
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": "5"
                        },
                        "reviewBody": "The team's attention to detail and creative approach set them apart. They didn't just build a website—they built a complete digital experience."
                    }
                ]
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
                "inLanguage": ["en", "fr"],
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://www.bidayalab.com/blogs?search={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": "https://www.bidayalab.com/#webpage",
                "url": "https://www.bidayalab.com",
                "name": "Digital Transformation Agency for SMEs | BidayaLab",
                "isPartOf": {
                    "@id": "https://www.bidayalab.com/#website"
                },
                "about": {
                    "@id": "https://www.bidayalab.com/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://www.bidayalab.com/#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.bidayalab.com/"
                    }
                ]
            },
            {
                "@type": "Service",
                "@id": "https://www.bidayalab.com/#service-ai",
                "name": "AI Automation",
                "description": "We automate your workflows with intelligent chatbots and seamless CRM integrations.",
                "provider": {
                    "@id": "https://www.bidayalab.com/#organization"
                },
                "serviceType": "AI Automation Services",
                "areaServed": ["MA", "US", "AE", "SA"]
            },
            {
                "@type": "Service",
                "@id": "https://www.bidayalab.com/#service-web",
                "name": "Web Development",
                "description": "Custom websites and web applications built with cutting-edge technology.",
                "provider": {
                    "@id": "https://www.bidayalab.com/#organization"
                },
                "serviceType": "Web Development Services",
                "areaServed": ["MA", "US", "AE", "SA"]
            },
            {
                "@type": "Service",
                "@id": "https://www.bidayalab.com/#service-visual",
                "name": "Visual Storytelling",
                "description": "Premium video production and photography that captures your brand essence.",
                "provider": {
                    "@id": "https://www.bidayalab.com/#organization"
                },
                "serviceType": "Visual Storytelling Services",
                "areaServed": ["MA", "US", "AE", "SA"]
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://www.bidayalab.com/#localbusiness",
                "name": "BidayaLab",
                "image": "https://www.bidayalab.com/assets/icons/logo.svg",
                "url": "https://www.bidayalab.com",
                "telephone": "+212-751-388-901",
                "email": "support@bidayalab.com",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Marrakech",
                    "addressLocality": "Marrakech",
                    "addressRegion": "Marrakech-Safi",
                    "postalCode": "40000",
                    "addressCountry": "MA"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 31.6295,
                    "longitude": -7.9811
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                ],
                "areaServed": [
                    { "@type": "Country", "name": "Morocco" },
                    { "@type": "Country", "name": "France" },
                    { "@type": "Country", "name": "United Arab Emirates" },
                    { "@type": "Country", "name": "Saudi Arabia" },
                    { "@type": "Country", "name": "United States" }
                ],
                "knowsLanguage": ["en", "fr", "ar"],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "BidayaLab services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "name": "AI Automation",
                            "description": "n8n + GPT/Claude/Mistral workflows that cut 60–80% of manual ops.",
                            "price": "28000",
                            "priceCurrency": "MAD",
                            "itemOffered": { "@id": "https://www.bidayalab.com/#service-ai" }
                        },
                        {
                            "@type": "Offer",
                            "name": "Web Engineering",
                            "description": "Next.js + headless CMS + Shopify Hydrogen builds with measured Core Web Vitals.",
                            "price": "45000",
                            "priceCurrency": "MAD",
                            "itemOffered": { "@id": "https://www.bidayalab.com/#service-web" }
                        },
                        {
                            "@type": "Offer",
                            "name": "Brand & Motion",
                            "description": "Brand systems and motion design built around measurable conversion outcomes.",
                            "price": "38000",
                            "priceCurrency": "MAD",
                            "itemOffered": { "@id": "https://www.bidayalab.com/#service-visual" }
                        }
                    ]
                },
                "sameAs": [
                    "https://www.linkedin.com/company/bidayalab",
                    "https://www.instagram.com/bidayalab",
                    "https://x.com/bidayalab",
                    "https://github.com/bidayalab",
                    "https://www.crunchbase.com/organization/bidayalab"
                ]
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
