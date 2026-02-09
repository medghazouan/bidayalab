import Script from 'next/script';

export default function GlobalSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://bidayalab.com/#organization",
                "name": "BidayaLab",
                "url": "https://bidayalab.com",
                "description": "We help ambitious startups and SMEs scale with AI automation, custom web development, and visual storytelling.",
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
                    "email": "hello@bidayalab.com",
                    "areaServed": ["US", "AE", "SA", "MA"],
                    "availableLanguage": ["en", "ar", "fr"]
                },
                "slogan": "Together, We Build Your Digital Future"
            },
            {
                "@type": "WebSite",
                "@id": "https://bidayalab.com/#website",
                "url": "https://bidayalab.com",
                "name": "BidayaLab",
                "description": "Digital Transformation Agency for SMEs | AI Automation, Web Development & Visual Storytelling",
                "publisher": {
                    "@id": "https://bidayalab.com/#organization"
                },
                "inLanguage": "en-US",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://bidayalab.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "ProfessionalService",
                "@id": "https://bidayalab.com/#service",
                "name": "BidayaLab Digital Services",
                "description": "AI-powered automation, custom web development, and premium visual storytelling for ambitious businesses.",
                "url": "https://bidayalab.com/services",
                "provider": {
                    "@id": "https://bidayalab.com/#organization"
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
                        "latitude": 33.5731,
                        "longitude": -7.5898
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
            },
            {
                "@type": "FAQPage",
                "@id": "https://bidayalab.com/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What services does BidayaLab offer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We offer AI automation (chatbots, workflow automation), custom web development (websites, web apps, e-commerce), and visual storytelling (video production, photography, motion graphics)."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Who is BidayaLab for?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We work with ambitious startups and SMEs who have quality products or services and want to scale efficiently through smart automation and custom digital platforms."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How long does a typical project take?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex AI automation systems may take 6-12 weeks. We'll provide a detailed timeline during our initial consultation."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer ongoing support?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes! We believe in building long-term partnerships. All our projects include post-launch support, and we offer ongoing maintenance and optimization packages."
                        }
                    }
                ]
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
