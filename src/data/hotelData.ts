import { HotelConfig } from '../types/hotel';

export const initialHotelData: HotelConfig = {
  name: "Hotel Bridge",
  tagline: "UNNAO",
  heroHeadline: "Comfortable Stays. Memorable Moments.",
  heroSubtitle: "Stay, dine and celebrate at Hotel Bridge, Unnao.",
  locationName: "Unnao, Uttar Pradesh",
  addressLine1: "595, Pitamber Nagar-II, Lucknow Bypass",
  addressLine2: "Near Koyla Gali, Shiv Nagar",
  city: "Unnao",
  state: "Uttar Pradesh",
  pincode: "209801",
  country: "India",
  fullAddress: "595, Pitamber Nagar-II, Lucknow Bypass, Near Koyla Gali, Shiv Nagar, Unnao, Uttar Pradesh 209801, India",
  primaryPhone: "+916307951300",
  whatsappNumber: "916307951300",
  email: "info@hotelbridge.in",
  website: "https://hotelbridge.in/",
  logoUrl: "/logo.svg",
  googleRating: 4.6,
  reviewCount: 143,
  googleMapUrl: "https://maps.google.com/?q=Hotel+Bridge+Unnao+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao+Uttar+Pradesh+209801",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14287.42398453479!2d80.4800!3d26.5450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c470000000001%3A0x1!2sHotel%20Bridge%20Unnao!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  
  // Authentic curated hospitality photography
  heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85",
  heroSecondaryImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  
  aboutIntro: "Conveniently situated along the Lucknow Bypass in Unnao, Hotel Bridge offers thoughtfully appointed accommodations, fine pure vegetarian dining at Royal Kitchen, and versatile event venues for family gatherings and corporate functions.",
  aboutHighlights: [
    "Prime accessibility right off the Lucknow Bypass corridor",
    "Royal Kitchen: 100% Pure Vegetarian Restaurant with Jain options",
    "Tailored event spaces for weddings, receptions, and business meets",
    "Dedicated 24/7 guest assistance and seamless travel support"
  ],

  whatsappTemplates: {
    general: "Hello Hotel Bridge, I would like to know more about rooms and availability.",
    room: "Hello Hotel Bridge, I am interested in {roomName}. Please share availability and current tariff.",
    restaurant: "Hello Royal Kitchen, I would like to enquire about dining for {guests} guests on {date}.",
    event: "Hello Hotel Bridge, I am planning a {eventType} for approximately {guests} guests on {date}. Please share venue and package details.",
    contact: "Hello Hotel Bridge, I would like to get in touch with the hotel."
  },

  rooms: [
    {
      id: "deluxe-ac",
      name: "Deluxe Room with Air Conditioning",
      category: "deluxe",
      shortDesc: "Well-appointed comfortable room equipped with climate control, premium bedding, and modern amenities.",
      longDesc: "Our Deluxe AC Room provides a restful retreat after travel or work. Features crisp premium linens, silent air conditioning, an ergonomic workspace, high-speed Wi-Fi, and an attached modern bathroom with hot/cold shower.",
      size: "240 sq.ft",
      bedType: "1 Queen Bed / King Bed",
      capacity: "2 Adults + 1 Child",
      view: "Courtyard / Hotel View",
      priceNote: "Enquire for current tariff",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
      ],
      amenities: [
        "Air Conditioning",
        "Free High-Speed Wi-Fi",
        "Flat Screen HD TV",
        "Daily Housekeeping",
        "24/7 Room Service",
        "Attached Modern Bathroom",
        "Complimentary Toiletries",
        "Mineral Water",
        "Power Backup"
      ]
    },
    {
      id: "deluxe-city-view",
      name: "Deluxe Room with City View",
      category: "deluxe",
      shortDesc: "Bright and airy room offering expansive views of Unnao city skyline with elevated comfort.",
      longDesc: "Enjoy natural day lighting and pleasant city vistas from this spacious Deluxe Room. Designed with subtle neutral aesthetics, a plush mattress, tea/coffee maker, and prompt room dining from Royal Kitchen.",
      size: "260 sq.ft",
      bedType: "1 King Size Bed",
      capacity: "2 Adults + 1 Child",
      view: "Unnao City View",
      priceNote: "Enquire for current tariff",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80"
      ],
      amenities: [
        "Scenic City View Windows",
        "Air Conditioning",
        "Free High-Speed Wi-Fi",
        "Flat Screen TV with Satellite Channels",
        "Work Desk & Chair",
        "Room Service Access",
        "Hot & Cold Water 24/7",
        "Electric Kettle on Request"
      ]
    },
    {
      id: "suite-city-view",
      name: "Suite Room with City View",
      category: "suite",
      shortDesc: "Our most spacious category featuring an integrated seating lounge, king bedding, and panoramic views.",
      longDesc: "Ideal for families, executive travelers, or guests attending local celebrations. The Suite Room combines generous square footage, plush seating arrangements, dedicated hospitality service, and panoramic city outlook.",
      size: "380 sq.ft",
      bedType: "1 Master King Bed + Lounge Sofa",
      capacity: "3 Adults or 2 Adults + 2 Children",
      view: "Panoramic City & Bypass View",
      priceNote: "Enquire for current tariff",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      ],
      amenities: [
        "Spacious Lounge Seating Area",
        "Panoramic Windows",
        "Split Air Conditioning",
        "Smart LED TV",
        "High-Speed Wi-Fi",
        "Dedicated Luggage Space",
        "Premium Toiletries Kit",
        "Express Room Service",
        "Full Power Backup"
      ]
    }
  ],

  facilities: [
    {
      id: "fac-ac",
      name: "Air Conditioning",
      iconName: "Wind",
      description: "Individual climate-controlled rooms ensuring cool comfort throughout your stay.",
      category: "room",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-wifi",
      name: "High-Speed Wi-Fi",
      iconName: "Wifi",
      description: "Complimentary wireless internet available across all rooms and common areas.",
      category: "service",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-restaurant",
      name: "Royal Kitchen (Pure Veg)",
      iconName: "UtensilsCrossed",
      description: "On-site pure vegetarian dining with authentic North & South Indian and Jain cuisines.",
      category: "dining",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-room-service",
      name: "Room Service",
      iconName: "BellRing",
      description: "Freshly prepared dining and beverages delivered directly to your room.",
      category: "dining",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-power",
      name: "100% Power Backup",
      iconName: "Zap",
      description: "Uninterrupted electrical backup for air conditioning, lighting, and power outlets.",
      category: "safety",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-housekeeping",
      name: "Daily Housekeeping",
      iconName: "Sparkles",
      description: "Impeccable hygiene standards with daily linen change and room sanitization.",
      category: "service",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-luggage",
      name: "Luggage Assistance",
      iconName: "Luggage",
      description: "Friendly staff to assist with your bags upon arrival and departure.",
      category: "service",
      isVerified: true,
      isFeatured: false
    },
    {
      id: "fac-safety",
      name: "Smoke Detectors & Safety",
      iconName: "ShieldCheck",
      description: "Modern fire safety detection and 24-hour property security oversight.",
      category: "safety",
      isVerified: true,
      isFeatured: false
    },
    {
      id: "fac-railway",
      name: "Railway Station Transfer",
      iconName: "Train",
      description: "Assistance with pickup/drop to Unnao Junction (approx. 2.7 km away).",
      category: "transit",
      isVerified: true,
      isFeatured: true
    },
    {
      id: "fac-airport",
      name: "Airport Transfer Support",
      iconName: "Plane",
      description: "Convenient transit arrangement to Kanpur Airport and Lucknow International Airport.",
      category: "transit",
      isVerified: true,
      isFeatured: false
    }
  ],

  restaurant: {
    name: "Royal Kitchen",
    tagline: "Pure Vegetarian Restaurant",
    heading: "Royal Kitchen",
    subheading: "Pure Vegetarian Dining at Hotel Bridge",
    description: "Royal Kitchen brings together the rich culinary heritage of North Indian gravies, aromatic tandoor breads, South Indian delicacies, and Chinese favourites. Prepared in a strictly pure vegetarian kitchen with custom Jain food preparation available upon request.",
    isPureVeg: true,
    isJainAvailable: true,
    cuisines: ["North Indian", "South Indian", "Tandoori Specialties", "Chinese & Snacks", "Jain Specialties"],
    timing: "Breakfast: 7:30 AM – 10:30 AM | Lunch & Dinner: 12:30 PM – 11:00 PM",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ],
    highlights: [
      "100% Pure Vegetarian Kitchen",
      "Special Jain Preparation without Onion/Garlic",
      "Comfortable air-conditioned family seating",
      "Takeaway and room-delivery available"
    ],
    menuCategories: [
      {
        id: "soups-salads",
        name: "Soups & Salads",
        description: "Freshly prepared wholesome starters and garden greens",
        items: [
          { id: "s1", name: "Tomato Soup", category: "Soups & Salads", price: 120, isJainAvailable: true, isChefSpecial: false, description: "Classic velvety ripe tomato soup with herb croutons" },
          { id: "s2", name: "Sweet Corn Veg Soup", category: "Soups & Salads", price: 130, isJainAvailable: true, isChefSpecial: false, description: "Light broth with tender sweet corn kernels and seasonal vegetables" },
          { id: "s3", name: "Hot & Sour Veg Soup", category: "Soups & Salads", price: 130, isJainAvailable: false, isChefSpecial: false, description: "Spicy and tangy oriental soup loaded with shredded vegetables" },
          { id: "s4", name: "Fresh Green Salad", category: "Soups & Salads", price: 90, isJainAvailable: true, isChefSpecial: false, description: "Farm fresh cucumber, tomato, carrot, and lemon slices" }
        ]
      },
      {
        id: "starters",
        name: "Starters & Appetizers",
        description: "Crispy tandoori and wok-tossed vegetarian snacks",
        items: [
          { id: "st1", name: "Paneer Tikka (Tandoori)", category: "Starters", price: 260, isJainAvailable: true, isChefSpecial: true, description: "Marinated cottage cheese cubes roasted in clay oven with bell peppers" },
          { id: "st2", name: "Crispy Corn Salt & Pepper", category: "Starters", price: 210, isJainAvailable: true, isChefSpecial: true, description: "Golden fried sweet corn tossed with spring herbs and mild peppers" },
          { id: "st3", name: "Veg Manchurian Dry", category: "Starters", price: 190, isJainAvailable: false, isChefSpecial: false, description: "Minced vegetable dumplings wok-tossed in savory garlic-soya sauce" },
          { id: "st4", name: "Chilli Paneer Dry", category: "Starters", price: 250, isJainAvailable: false, isChefSpecial: false, description: "Paneer cubes tossed with capsicum, onion, and green chillies" },
          { id: "st5", name: "Hara Bhara Kebab", category: "Starters", price: 200, isJainAvailable: false, isChefSpecial: false, description: "Spinach, green pea, and spiced potato pan-seared patties" }
        ]
      },
      {
        id: "main-course",
        name: "Main Course Specialties",
        description: "Authentic North Indian gravies and rich curries",
        items: [
          { id: "m1", name: "Paneer Butter Masala", category: "Main Course", price: 280, isJainAvailable: true, isChefSpecial: true, description: "Tender paneer cubes simmered in rich creamy tomato and butter gravy" },
          { id: "m2", name: "Kadhai Paneer", category: "Main Course", price: 270, isJainAvailable: false, isChefSpecial: false, description: "Paneer and fresh bell peppers tossed with freshly pounded kadhai spices" },
          { id: "m3", name: "Shahi Paneer", category: "Main Course", price: 290, isJainAvailable: true, isChefSpecial: false, description: "Royal royal cashew and saffron based mild sweet white gravy" },
          { id: "m4", name: "Dal Makhani", category: "Main Course", price: 230, isJainAvailable: true, isChefSpecial: true, description: "Slow-cooked black lentils simmered overnight with cream and butter" },
          { id: "m5", name: "Dal Tadka (Yellow Dal)", category: "Main Course", price: 180, isJainAvailable: true, isChefSpecial: false, description: "Yellow arhar lentils tempered with cumin, garlic, and desi ghee" },
          { id: "m6", name: "Mix Vegetable Curry", category: "Main Course", price: 210, isJainAvailable: true, isChefSpecial: false, description: "Assorted seasonal garden vegetables cooked in spiced onion-tomato gravy" },
          { id: "m7", name: "Malai Kofta", category: "Main Course", price: 290, isJainAvailable: true, isChefSpecial: true, description: "Soft paneer-khoya dumplings bathed in velvety cashew cream gravy" }
        ]
      },
      {
        id: "breads",
        name: "Indian Breads (Tandoor)",
        description: "Freshly baked in traditional clay tandoor",
        items: [
          { id: "b1", name: "Tandoori Roti (Plain / Butter)", category: "Breads", price: 25, isJainAvailable: true, isChefSpecial: false, description: "Whole wheat flatbread baked in clay tandoor" },
          { id: "b2", name: "Butter Naan", category: "Breads", price: 55, isJainAvailable: true, isChefSpecial: false, description: "Leavened fine flour bread brushed with molten butter" },
          { id: "b3", name: "Garlic Naan", category: "Breads", price: 70, isJainAvailable: false, isChefSpecial: true, description: "Naan topped with chopped roasted garlic and fresh coriander" },
          { id: "b4", name: "Lachha Paratha", category: "Breads", price: 60, isJainAvailable: true, isChefSpecial: false, description: "Multi-layered flaky whole wheat bread baked with butter" },
          { id: "b5", name: "Stuffed Paneer Kulcha", category: "Breads", price: 90, isJainAvailable: true, isChefSpecial: false, description: "Kulcha stuffed with spiced cottage cheese and herbs" }
        ]
      },
      {
        id: "rice-biryani",
        name: "Rice & Biryani",
        description: "Fragrant basmati rice preparations and spiced pulao",
        items: [
          { id: "r1", name: "Royal Veg Dum Biryani", category: "Rice & Biryani", price: 250, isJainAvailable: false, isChefSpecial: true, description: "Aromatic basmati rice layered with spiced vegetables and herbs, served with raita" },
          { id: "r2", name: "Jeera Rice", category: "Rice & Biryani", price: 150, isJainAvailable: true, isChefSpecial: false, description: "Long-grain basmati tempered with royal cumin seeds and ghee" },
          { id: "r3", name: "Veg Pulao", category: "Rice & Biryani", price: 180, isJainAvailable: true, isChefSpecial: false, description: "Basmati rice cooked with garden peas, carrots, and whole spices" },
          { id: "r4", name: "Steamed Basmati Rice", category: "Rice & Biryani", price: 120, isJainAvailable: true, isChefSpecial: false, description: "Fluffy steamed premium basmati rice" }
        ]
      },
      {
        id: "fried-rice-noodles",
        name: "Fried Rice & Noodles",
        description: "Wok-tossed Chinese favorites",
        items: [
          { id: "c1", name: "Veg Hakka Noodles", category: "Fried Rice & Noodles", price: 170, isJainAvailable: false, isChefSpecial: false, description: "Wok-tossed noodles with shredded cabbage, capsicum, and carrots" },
          { id: "c2", name: "Veg Fried Rice", category: "Fried Rice & Noodles", price: 170, isJainAvailable: false, isChefSpecial: false, description: "Basmati rice wok-tossed with chopped veggies and mild spices" },
          { id: "c3", name: "Chilli Garlic Noodles", category: "Fried Rice & Noodles", price: 190, isJainAvailable: false, isChefSpecial: false, description: "Spicy noodles tossed with burnt garlic and red chilli sauce" }
        ]
      },
      {
        id: "snacks-maggi",
        name: "Snacks & Quick Bites",
        description: "Tea-time favourites and comfort bowls",
        items: [
          { id: "sn1", name: "Paneer Pakoda (6 pcs)", category: "Snacks", price: 160, isJainAvailable: true, isChefSpecial: false, description: "Fresh cottage cheese dipped in spiced gram flour batter and deep fried" },
          { id: "sn2", name: "Veg Sandwich (Grilled / Plain)", category: "Snacks", price: 120, isJainAvailable: true, isChefSpecial: false, description: "Toasted bread with fresh vegetable filling and mint chutney" },
          { id: "sn3", name: "Classic Veg Maggi", category: "Snacks", price: 90, isJainAvailable: false, isChefSpecial: false, description: "Hot masala maggi prepared with chopped green vegetables" },
          { id: "sn4", name: "Cheese Butter Maggi", category: "Snacks", price: 120, isJainAvailable: false, isChefSpecial: true, description: "Decadent Maggi topped with melted cheese and butter" }
        ]
      },
      {
        id: "accompaniments",
        name: "Raita & Beverages",
        description: "Refreshing accompaniments and cold/hot beverages",
        items: [
          { id: "ac1", name: "Boondi Raita", category: "Accompaniments", price: 90, isJainAvailable: true, isChefSpecial: false, description: "Chilled whipped curd with crisp gram flour pearls and roasted cumin" },
          { id: "ac2", name: "Mix Veg Raita", category: "Accompaniments", price: 100, isJainAvailable: true, isChefSpecial: false, description: "Yogurt with diced cucumber, tomato, and fresh coriander" },
          { id: "ac3", name: "Masala Chaas / Buttermilk", category: "Accompaniments", price: 60, isJainAvailable: true, isChefSpecial: false, description: "Refreshing churned spiced buttermilk with mint" },
          { id: "ac4", name: "Special Masala Tea", category: "Accompaniments", price: 40, isJainAvailable: true, isChefSpecial: false, description: "Freshly brewed Indian tea with ginger and cardamom" }
        ]
      }
    ]
  },

  events: [
    {
      id: "weddings-engagements",
      name: "Weddings & Ring Ceremonies",
      tagline: "Cherish your milestone celebration with seamless hospitality",
      description: "Celebrate sacred beginnings with comfortable guest accommodation, banquet arrangements, and pure vegetarian catering customized to your family traditions.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      suitableCapacity: "Custom guest setups",
      features: [
        "Dedicated event coordinator",
        "Pure vegetarian & Jain catering menus",
        "Stage & mandap setup assistance",
        "Guest room blocks on Lucknow Bypass"
      ]
    },
    {
      id: "birthdays-anniversaries",
      name: "Birthdays & Family Anniversaries",
      tagline: "Joyful private gatherings with loved ones",
      description: "Host memorable birthday bashes, baby showers, kitty parties, and milestone family anniversaries in an intimate, air-conditioned environment.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
      suitableCapacity: "Flexible intimate gatherings",
      features: [
        "Customized party decor support",
        "Snacks, starter platters & mocktails",
        "Sound & music setup coordination",
        "Ample parking area for guests"
      ]
    },
    {
      id: "corporate-meetings",
      name: "Corporate Meetings & Seminars",
      tagline: "Professional meeting venue in Unnao",
      description: "Conduct conferences, dealer meets, workshops, and business discussions with high-speed Wi-Fi, audio-visual support, and executive high-tea.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80",
      suitableCapacity: "Boardroom & theatre layouts",
      features: [
        "Audio-visual & projector assistance",
        "High-speed Wi-Fi connectivity",
        "Executive lunch & coffee breaks",
        "Quiet, private meeting ambiance"
      ]
    }
  ],

  gallery: [
    {
      id: "g1",
      title: "Hotel Bridge Exterior & Entrance",
      category: "exterior",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      alt: "Hotel Bridge exterior near Lucknow Bypass Unnao",
      isFeatured: true
    },
    {
      id: "g2",
      title: "Deluxe AC Guest Room",
      category: "rooms",
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      alt: "Deluxe air conditioned bedroom at Hotel Bridge",
      isFeatured: true
    },
    {
      id: "g3",
      title: "Royal Kitchen Restaurant Seating",
      category: "restaurant",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      alt: "Royal Kitchen pure vegetarian restaurant dining area",
      isFeatured: true
    },
    {
      id: "g4",
      title: "Suite Room with Lounge",
      category: "rooms",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      alt: "Spacious Suite room at Hotel Bridge Unnao",
      isFeatured: true
    },
    {
      id: "g5",
      title: "Pure Vegetarian Culinary Delights",
      category: "food",
      url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
      alt: "North Indian veg curries at Royal Kitchen",
      isFeatured: false
    },
    {
      id: "g6",
      title: "Tandoori Paneer Tikka Platter",
      category: "food",
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
      alt: "Freshly roasted paneer tikka starter",
      isFeatured: false
    },
    {
      id: "g7",
      title: "Celebration & Banquet Setup",
      category: "events",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      alt: "Banquet celebration setup for events",
      isFeatured: false
    },
    {
      id: "g8",
      title: "Modern Hotel Lobby & Reception",
      category: "interior",
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
      alt: "Hotel Bridge reception and front desk area",
      isFeatured: false
    },
    {
      id: "g9",
      title: "Deluxe Room City View",
      category: "rooms",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      alt: "Deluxe room with city view window",
      isFeatured: false
    }
  ],

  attractions: [
    {
      id: "att-stadium",
      name: "Pt. Deen Dayal Upadhyay Stadium",
      distance: "600 meter",
      duration: "2 min drive / 6 min walk",
      type: "Sports Stadium & Arena",
      category: "sports",
      iconEmoji: "🏟️",
      description: "Premier sports facility in Unnao for cricket, athletics, and regional athletic meets, situated right next to Hotel Bridge.",
      image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Pt.+Deen+Dayal+Upadhyay+Stadium+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Pt+Deen+Dayal+Upadhyay+Stadium+Unnao"
    },
    {
      id: "att-hospital",
      name: "Shivaya Hospital",
      distance: "800 meter",
      duration: "2 min drive / 8 min walk",
      type: "Multi-Speciality Healthcare",
      category: "health",
      iconEmoji: "🏥",
      description: "Leading multi-speciality medical center and 24/7 emergency healthcare facility situated within walking proximity.",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Shivaya+Hospital+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Shivaya+Hospital+Unnao"
    },
    {
      id: "att-station",
      name: "Unnao Railway Station",
      distance: "1.5 km",
      duration: "4 mins drive",
      type: "Railway Station & Transit",
      category: "transit",
      iconEmoji: "🚉",
      description: "Major railway junction on Lucknow-Kanpur line with round-the-clock express and passenger train connectivity.",
      image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Unnao+Railway+Station",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Unnao+Railway+Station"
    },
    {
      id: "att-park",
      name: "Nirala Park",
      distance: "1.6 km",
      duration: "5 mins drive",
      type: "Urban Park & Recreation",
      category: "nature",
      iconEmoji: "🏞️",
      description: "Picturesque green city park dedicated to legendary poet Suryakant Tripathi 'Nirala', popular for morning jogs and family leisure.",
      image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Nirala+Park+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Nirala+Park+Unnao"
    },
    {
      id: "att-dahi-chowki",
      name: "Dahi Chowki Industrial Area",
      distance: "4 km",
      duration: "7 mins drive",
      type: "Major Business & Industrial Hub",
      category: "industrial",
      iconEmoji: "🏭",
      description: "Prominent industrial zone housing premier manufacturing units, corporate plants, logistics hubs, and export offices.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Dahi+Chowki+Industrial+Area+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Dahi+Chowki+Industrial+Area+Unnao"
    },
    {
      id: "att-akrampur",
      name: "Akrampur Industrial Area",
      distance: "4.5 km",
      duration: "8 mins drive",
      type: "Manufacturing & Industrial Center",
      category: "industrial",
      iconEmoji: "🏭",
      description: "Key industrial corridor home to chemical, manufacturing, leather, and engineering industries in Unnao.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Akrampur+Industrial+Area+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Akrampur+Industrial+Area+Unnao"
    },
    {
      id: "att-banthar",
      name: "Banthar Industrial Area",
      distance: "8 km",
      duration: "12 mins drive",
      type: "Export & Leather Technology Park",
      category: "industrial",
      iconEmoji: "🏭",
      description: "Globally renowned Leather Technology Park and heavy industrial complex, attracting domestic and global corporate visitors.",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Banthar+Industrial+Area+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Banthar+Industrial+Area+Unnao"
    },
    {
      id: "att-bird-sanctuary",
      name: "Nawabganj Bird Sanctuary",
      distance: "18 km",
      duration: "22 mins drive",
      type: "Wildlife Sanctuary & Lake",
      category: "nature",
      iconEmoji: "🦜",
      description: "Renowned Shaheed Chandra Shekhar Azad Bird Sanctuary, home to over 250 migratory bird species, deer park, and watchtowers.",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Nawabganj+Bird+Sanctuary+Unnao",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Nawabganj+Bird+Sanctuary+Unnao"
    },
    {
      id: "att-kanpur-airport",
      name: "Kanpur Airport (Chakeri)",
      distance: "21.5 km",
      duration: "35 mins drive",
      type: "Domestic Airport",
      category: "transit",
      iconEmoji: "✈️",
      description: "Operational airport serving Kanpur and Unnao with direct scheduled flights to Delhi, Mumbai, Bengaluru, and major metros.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Kanpur+Airport+Chakeri",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Kanpur+Airport+Chakeri"
    },
    {
      id: "att-lucknow-airport",
      name: "Lucknow International Airport (CCSI)",
      distance: "50 km",
      duration: "50 mins drive",
      type: "International Airport",
      category: "transit",
      iconEmoji: "✈️",
      description: "Chaudhary Charan Singh International Airport (Amausi), offering direct global and nationwide flight connections via Lucknow Bypass.",
      image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
      mapQuery: "Chaudhary+Charan+Singh+International+Airport+Lucknow",
      googleMapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Hotel+Bridge+595+Pitamber+Nagar-II+Lucknow+Bypass+Unnao&destination=Chaudhary+Charan+Singh+International+Airport+Lucknow"
    }
  ],

  transit: [
    {
      id: "tr-stadium",
      title: "Pt. Deen Dayal Upadhyay Stadium",
      distance: "600 meter",
      duration: "2 min drive / 6 min walk",
      type: "sports",
      iconEmoji: "🏟️",
      note: "Immediate proximity for sports tournaments, athletic events, and morning walks.",
      mapQuery: "Pt.+Deen+Dayal+Upadhyay+Stadium+Unnao"
    },
    {
      id: "tr-hospital",
      title: "Shivaya Hospital",
      distance: "800 meter",
      duration: "2 min drive / 8 min walk",
      type: "health",
      iconEmoji: "🏥",
      note: "Immediate 24/7 medical access and emergency assistance.",
      mapQuery: "Shivaya+Hospital+Unnao"
    },
    {
      id: "tr-railway",
      title: "Unnao Railway Station",
      distance: "1.5 km",
      duration: "4 mins drive",
      type: "railway",
      iconEmoji: "🚉",
      note: "Primary railway junction with round-the-clock trains to Lucknow, Kanpur, and Delhi.",
      mapQuery: "Unnao+Railway+Station"
    },
    {
      id: "tr-dahi-chowki",
      title: "Dahi Chowki Industrial Area",
      distance: "4 km",
      duration: "7 mins drive",
      type: "industrial",
      iconEmoji: "🏭",
      note: "Fast 7-minute direct transit for corporate and business travelers.",
      mapQuery: "Dahi+Chowki+Industrial+Area+Unnao"
    },
    {
      id: "tr-akrampur",
      title: "Akrampur Industrial Area",
      distance: "4.5 km",
      duration: "8 mins drive",
      type: "industrial",
      iconEmoji: "🏭",
      note: "Manufacturing and industrial zone on highway corridor.",
      mapQuery: "Akrampur+Industrial+Area+Unnao"
    },
    {
      id: "tr-banthar",
      title: "Banthar Industrial Area",
      distance: "8 km",
      duration: "12 mins drive",
      type: "industrial",
      iconEmoji: "🏭",
      note: "Leather technology and export complex.",
      mapQuery: "Banthar+Industrial+Area+Unnao"
    },
    {
      id: "tr-kanpur-airport",
      title: "Kanpur Airport (Chakeri)",
      distance: "21.5 km",
      duration: "35 mins drive",
      type: "airport",
      iconEmoji: "✈️",
      note: "Direct domestic flights to major metros via NH27 Kanpur highway.",
      mapQuery: "Kanpur+Airport+Chakeri"
    },
    {
      id: "tr-lucknow-airport",
      title: "Lucknow International Airport (CCSI)",
      distance: "50 km",
      duration: "50 mins drive",
      type: "airport",
      iconEmoji: "✈️",
      note: "Seamless expressway and Lucknow Bypass connectivity to terminal.",
      mapQuery: "Chaudhary+Charan+Singh+International+Airport+Lucknow"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Prashant Kumar",
      rating: 5,
      source: "Google Reviews",
      comment: "Very neat and clean hotel located right by the Lucknow Bypass. The staff is polite, rooms are comfortable and Royal Kitchen serves delicious pure veg food.",
      date: "Recent Google Review"
    },
    {
      id: "rev-2",
      author: "Vikas Shukla",
      rating: 5,
      source: "Google Reviews",
      comment: "Ideal property in Unnao for family stay or functions. Prompt service, good air conditioning, and convenient parking facility.",
      date: "Recent Google Review"
    },
    {
      id: "rev-3",
      author: "Anjali Gupta",
      rating: 4,
      source: "Google Reviews",
      comment: "Good location near Shiv Nagar. We booked rooms for our guests during a wedding. Seamless check-in and quick response on WhatsApp.",
      date: "Recent Google Review"
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "Where is Hotel Bridge located?",
      answer: "Hotel Bridge is situated at 595, Pitamber Nagar-II, Lucknow Bypass, Near Koyla Gali, Shiv Nagar, Unnao, Uttar Pradesh 209801. It is easily accessible from the main highway and just ~2.7 km from Unnao Junction Railway Station."
    },
    {
      id: "faq-2",
      question: "What room types are available at Hotel Bridge?",
      answer: "We offer Deluxe Rooms with Air Conditioning, Deluxe Rooms with City View, and spacious Suite Rooms with integrated lounge seating. All rooms feature attached private bathrooms, Wi-Fi, and 24/7 power backup."
    },
    {
      id: "faq-3",
      question: "Does Hotel Bridge have a restaurant on-site?",
      answer: "Yes, Hotel Bridge features Royal Kitchen, our dedicated pure vegetarian restaurant serving North Indian, South Indian, Tandoori items, and snacks. We also prepare authentic Jain meals upon request."
    },
    {
      id: "faq-4",
      question: "Is Royal Kitchen 100% pure vegetarian?",
      answer: "Yes, Royal Kitchen is strictly 100% pure vegetarian. We maintain clean food preparation practices and provide custom options without onion or garlic for Jain guests."
    },
    {
      id: "faq-5",
      question: "Can I host an event or wedding celebration here?",
      answer: "Yes, we host weddings, ring ceremonies, birthdays, anniversaries, corporate seminars, and private parties. Contact our event team via WhatsApp for customized capacity and catering packages."
    },
    {
      id: "faq-6",
      question: "How do I book a room or check availability?",
      answer: "You can instantly enquire and reserve directly with our front desk through WhatsApp (+91 63079 51300) or by calling us at +91 63079 51300. We share real-time tariffs and room availability immediately."
    }
  ],

  seo: {
    metaTitle: "Hotel Bridge, Unnao | Best Hotel & Pure Veg Restaurant on Lucknow Bypass",
    metaDescription: "Book your stay at Hotel Bridge, Unnao. Premium AC rooms, Royal Kitchen 100% pure vegetarian dining, banquet halls, and easy transit near Lucknow Bypass with direct WhatsApp booking.",
    metaKeywords: "hotel in unnao, hotel bridge unnao, royal kitchen unnao, pure veg restaurant unnao, lucknow bypass hotel unnao, banquet hall unnao, hotels near kanpur unnao, wedding lawn unnao",
    canonicalUrl: "https://hotelbridge.in/",
    ogImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=630&q=85",
    twitterCardType: "summary_large_image",
    enableStructuredData: true,
    businessType: "Hotel",
    geoLatitude: "26.5450",
    geoLongitude: "80.4800"
  }
};
