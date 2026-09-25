import React, { useEffect } from 'react';
import { useHotel } from '../context/HotelContext';

export const SEOHead: React.FC = () => {
  const { hotel } = useHotel();
  const seo = hotel.seo;

  useEffect(() => {
    // 1. Update Document Title
    const title =
      seo?.metaTitle ||
      `${hotel.name}, ${hotel.city || 'Unnao'} | Best Hotel & Pure Veg Restaurant on Lucknow Bypass`;
    document.title = title;

    // Helper to update or create a meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create a link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    const desc =
      seo?.metaDescription ||
      `Book your stay at ${hotel.name}, ${hotel.city || 'Unnao'}. Premium AC rooms, Royal Kitchen 100% pure vegetarian dining, banquet halls, and easy transit near Lucknow Bypass. Direct WhatsApp booking.`;

    const keywords =
      seo?.metaKeywords ||
      `hotel in ${hotel.city || 'unnao'}, ${hotel.name.toLowerCase()} ${hotel.city?.toLowerCase() || 'unnao'}, royal kitchen unnao, pure veg restaurant unnao, lucknow bypass hotel, banquet hall unnao`;

    const canonical = seo?.canonicalUrl || hotel.website || 'https://hotelbridge.in/';
    const ogImg =
      seo?.ogImage ||
      hotel.heroImage ||
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=630&q=85';

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', desc);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', `${hotel.name}, ${hotel.city || 'Unnao'}`);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLinkTag('canonical', canonical);

    // 3. OpenGraph Social Tags
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:image', ogImg);
    setMetaTag('property', 'og:site_name', hotel.name);
    setMetaTag('property', 'og:locale', 'en_IN');

    // 4. Twitter / X Cards
    setMetaTag('name', 'twitter:card', seo?.twitterCardType || 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', desc);
    setMetaTag('name', 'twitter:image', ogImg);
    setMetaTag('name', 'twitter:url', canonical);

    // 5. Local SEO & Geo Tags
    if (seo?.geoLatitude && seo?.geoLongitude) {
      setMetaTag('name', 'geo.position', `${seo.geoLatitude};${seo.geoLongitude}`);
      setMetaTag('name', 'ICBM', `${seo.geoLatitude}, ${seo.geoLongitude}`);
    }
    setMetaTag('name', 'geo.region', 'IN-UP');
    setMetaTag('name', 'geo.placename', hotel.city || 'Unnao');

    // 6. Dynamic JSON-LD Structured Data Schema
    if (seo?.enableStructuredData !== false) {
      let scriptElement = document.getElementById('hotel-dynamic-jsonld') as HTMLScriptElement | null;
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = 'hotel-dynamic-jsonld';
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }

      const roomOffers = hotel.rooms.map((room) => ({
        '@type': 'HotelRoom',
        name: room.name,
        description: room.shortDesc,
        bed: {
          '@type': 'BedDetails',
          numberOfBeds: 1,
          typeOfBed: room.bedType,
        },
        occupancy: {
          '@type': 'QuantitativeValue',
          value: room.capacity,
        },
        amenityFeature: room.amenities.map((amenity) => ({
          '@type': 'LocationFeatureSpecification',
          name: amenity,
          value: true,
        })),
      }));

      const faqItems = hotel.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      }));

      const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': [seo?.businessType || 'Hotel', 'LodgingBusiness'],
            '@id': `${canonical}#hotel`,
            name: hotel.name,
            alternateName: `${hotel.name} ${hotel.city}`,
            description: hotel.aboutIntro,
            url: canonical,
            telephone: hotel.primaryPhone,
            priceRange: '₹₹',
            image: [
              ogImg,
              hotel.heroSecondaryImage || hotel.heroImage,
            ].filter(Boolean),
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${hotel.addressLine1}, ${hotel.addressLine2}`,
              addressLocality: hotel.city,
              addressRegion: hotel.state,
              postalCode: hotel.pincode,
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: Number(seo?.geoLatitude || '26.5450'),
              longitude: Number(seo?.geoLongitude || '80.4800'),
            },
            hasMap: hotel.googleMapUrl,
            starRating: {
              '@type': 'Rating',
              ratingValue: hotel.googleRating.toString(),
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: hotel.googleRating.toString(),
              reviewCount: hotel.reviewCount.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            amenityFeature: hotel.facilities.map((f) => ({
              '@type': 'LocationFeatureSpecification',
              name: f.name,
              value: true,
            })),
            containsPlace: roomOffers,
            checkinTime: '12:00:00',
            checkoutTime: '11:00:00',
          },
          {
            '@type': 'Restaurant',
            '@id': `${canonical}#restaurant`,
            name: hotel.restaurant.name,
            description: hotel.restaurant.description,
            telephone: hotel.primaryPhone,
            url: `${canonical}#restaurant`,
            servesCuisine: hotel.restaurant.cuisines,
            priceRange: '₹₹',
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${hotel.addressLine1}, ${hotel.addressLine2}`,
              addressLocality: hotel.city,
              addressRegion: hotel.state,
              postalCode: hotel.pincode,
              addressCountry: 'IN',
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${canonical}#breadcrumbs`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: canonical,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Rooms & Tariff',
                item: `${canonical}#rooms`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Royal Kitchen Veg Dining',
                item: `${canonical}#restaurant`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Banquet & Events',
                item: `${canonical}#events`,
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Attractions & Transit',
                item: `${canonical}#attractions`,
              },
              {
                '@type': 'ListItem',
                position: 6,
                name: 'Contact & Front Desk',
                item: `${canonical}#contact`,
              },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${canonical}#faqpage`,
            mainEntity: faqItems,
          },
        ],
      };

      scriptElement.textContent = JSON.stringify(structuredData, null, 2);
    }
  }, [hotel, seo]);

  return null;
};
