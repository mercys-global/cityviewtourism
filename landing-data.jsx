// City View — data layer (destinations, packages, testimonials, deals, guides)
// Real Unsplash CDN URLs (auto-format=jpg, fit=crop, w=900 q=70)

const U = (id, w=1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Pool of verified Unsplash travel photos — used to build rich, varied galleries.
const GALLERY_POOL = [
  '1537996194471-e657df975ab4', '1604999333679-b86d54738315', '1512453979798-5ea266f8880c',
  '1528181304800-259b08848526', '1525625293386-3f8f99389edd', '1596422846543-75c6fc197f07',
  '1530122037265-a5f1f91d3b99', '1514282401047-d79a71a590e8', '1605283176568-9b41fde3672e',
  '1517248135467-4c7edcad34c4',
];
// Build a 5-image gallery anchored on a given photo id (no repeats, always valid).
const buildGallery = (anchorId, w=1100) => {
  const ids = [anchorId, ...GALLERY_POOL.filter(x => x !== anchorId)].slice(0, 5);
  return ids.map(id => U(id, w));
};

// Hero reel — 3 cinematic, autoplay-ready videos (high quality, royalty-free Pexels CDN).
// `poster` paints instantly while the clip streams; `slug` links to the destination page.
const HERO_REEL = [
  {
    city: 'Bali · Indonesia', slug: 'bali',
    tagline: 'rice terraces & sunset rituals',
    poster: U('1537996194471-e657df975ab4', 1200),
    img:    U('1537996194471-e657df975ab4', 1200),
    video:  'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
  },
  {
    city: 'Maldives · Atolls', slug: 'maldives',
    tagline: 'overwater calm · island days',
    poster: U('1514282401047-d79a71a590e8', 1200),
    img:    U('1514282401047-d79a71a590e8', 1200),
    video:  'https://videos.pexels.com/video-files/4010941/4010941-hd_1920_1080_25fps.mp4',
  },
  {
    city: 'Phuket · Thailand', slug: 'thailand',
    tagline: 'turquoise bays & island hops',
    poster: U('1528181304800-259b08848526', 1200),
    img:    U('1528181304800-259b08848526', 1200),
    video:  'https://videos.pexels.com/video-files/12021278/12021278-uhd_2560_1440_30fps.mp4',
  },
];

const DESTINATIONS = [
  {
    name: 'Bali', slug: 'bali', country: 'Indonesia', region: 'Asia',
    from: 54999, nights: '5N/6D', packages: 12, img: U('1537996194471-e657df975ab4'), tag: 'Best seller',
    blurb: 'Temples, rice terraces, surf towns and the warmest welcome in Southeast Asia.',
    overview: "Bali packs a dozen holidays into one island. Wake up to Ubud's emerald rice terraces, chase waterfalls through the jungle, then trade the highlands for the beach clubs of Seminyak and the cliff temples of Uluwatu. Our Bali plans balance culture, calm and a little bit of adventure — with private drivers so you never wrestle with the traffic.",
    bestTime: 'Apr – Oct (dry season)',
    flight: '~7h from Mumbai (1 stop)',
    visa: 'Visa on arrival',
    highlights: ['Ubud rice terraces & monkey forest', 'Uluwatu cliff temple at sunset', 'Nusa Penida island day-trip', 'Seminyak beach clubs', 'Sunrise trek up Mt Batur'],
  },
  {
    name: 'Dubai', slug: 'dubai', country: 'UAE', region: 'Asia',
    from: 39999, nights: '4N/5D', packages: 18, img: U('1512453979798-5ea266f8880c'), tag: 'No-visa hassle',
    blurb: 'Record-breaking skylines, golden deserts and the slickest weekend break going.',
    overview: 'Dubai is the easiest long weekend abroad you can plan — fast visas, direct flights and a city built for showing off. Go up the Burj Khalifa, drift over the dunes in a 4x4, dine at the top of the world and let the kids loose in the world’s biggest theme parks. It’s glossy, effortless and endlessly Instagrammable.',
    bestTime: 'Nov – Mar (cooler)',
    flight: '~3h direct from Mumbai',
    visa: '30-day e-visa, handled by us',
    highlights: ['Burj Khalifa observation deck', 'Red-dune desert safari & BBQ', 'Dhow dinner cruise at Marina', 'Old Dubai souks & abra ride', 'Day at Atlantis Aquaventure'],
  },
  {
    name: 'Thailand', slug: 'thailand', country: 'Phuket + Krabi', region: 'Asia',
    from: 44999, nights: '6N/7D', packages: 14, img: U('1528181304800-259b08848526'), tag: 'Beach & islands',
    blurb: 'Limestone bays, long-tail boats and street food worth flying for.',
    overview: 'Thailand’s Andaman coast is all turquoise water and dramatic limestone cliffs. Base yourself in buzzy Phuket and laid-back Krabi, then island-hop to Phi Phi and James Bond Island by speedboat. Add a temple or two, a night market crawl and a Thai massage, and you’ve got the perfect mix of party and peace.',
    bestTime: 'Nov – Apr (dry & sunny)',
    flight: '~4.5h from Mumbai (1 stop)',
    visa: 'Visa on arrival',
    highlights: ['Phi Phi & Maya Bay speedboat tour', 'James Bond Island sea-kayak', 'Tiger Cave Temple viewpoint', 'Phuket Old Town & night market', 'Sunset at Promthep Cape'],
  },
  {
    name: 'Singapore', slug: 'singapore', country: 'Singapore', region: 'Asia',
    from: 49999, nights: '4N/5D', packages: 9, img: U('1525625293386-3f8f99389edd'), tag: 'Family pick',
    blurb: 'A garden city of light shows, hawker lanes and theme-park thrills.',
    overview: 'Clean, safe and impossibly fun, Singapore is the family trip that just works. Marvel at Gardens by the Bay, ride the rides at Universal Studios, eat your way through Michelin-starred hawker stalls and catch the Marina Bay light show after dark. Everything is close, everything is on time.',
    bestTime: 'Year-round (Feb–Apr driest)',
    flight: '~5.5h direct from Mumbai',
    visa: 'e-visa, handled by us',
    highlights: ['Gardens by the Bay & Cloud Forest', 'Universal Studios Sentosa', 'Night Safari', 'Marina Bay Sands SkyPark', 'Hawker-centre food trail'],
  },
  {
    name: 'Malaysia', slug: 'malaysia', country: 'KL + Langkawi', region: 'Asia',
    from: 42999, nights: '5N/6D', packages: 7, img: U('1596422846543-75c6fc197f07'), tag: 'Budget friendly',
    blurb: 'Twin towers, rainforest cable-cars and duty-free island beaches.',
    overview: 'Malaysia gives you city and beach for less. Start under the Petronas Twin Towers in Kuala Lumpur, ride the Langkawi SkyCab over the rainforest, then unwind on duty-free island beaches. Great food, easy travel and brilliant value make it a favourite first trip abroad.',
    bestTime: 'Dec – Apr',
    flight: '~5h direct from Mumbai',
    visa: 'e-visa, handled by us',
    highlights: ['Petronas Towers skybridge', 'Langkawi SkyCab & SkyBridge', 'Batu Caves', 'Island-hopping by boat', 'KL street-food tour'],
  },
  {
    name: 'Switzerland', slug: 'switzerland', country: 'Alps loop', region: 'Europe',
    from: 124999, nights: '7N/8D', packages: 6, img: U('1530122037265-a5f1f91d3b99'), tag: 'Honeymoon',
    blurb: 'Glacier peaks, mirror lakes and the world’s most scenic train rides.',
    overview: 'Switzerland is the honeymoon postcard come to life. Ride cogwheel trains to snow-capped summits, cruise glassy lakes, and wander chocolate-box old towns. With a Swiss Travel Pass in hand you simply hop on and glide between Zurich, Interlaken and Lucerne — every window a fresh masterpiece.',
    bestTime: 'May – Sep (green) · Dec–Mar (snow)',
    flight: '~9h from Mumbai (1 stop)',
    visa: 'Schengen visa — we file it for you',
    highlights: ['Jungfraujoch — Top of Europe', 'Mt Titlis rotating cable-car', 'Lake Lucerne cruise', 'Interlaken & Lauterbrunnen valley', 'Glacier Express scenic rail'],
  },
  {
    name: 'Maldives', slug: 'maldives', country: 'Atolls', region: 'Asia',
    from: 89999, nights: '4N/5D', packages: 11, img: U('1514282401047-d79a71a590e8'), tag: 'Luxury',
    blurb: 'Overwater villas, house reefs and the bluest water on earth.',
    overview: 'The Maldives is barefoot luxury distilled. Step from your overwater villa straight into a warm lagoon, snorkel a house reef alive with turtles, and watch the sky turn pink over dinner on the sand. We pair the right island to your budget — from chic local-island stays to all-inclusive resorts.',
    bestTime: 'Nov – Apr (dry season)',
    flight: '~4h direct from Mumbai',
    visa: 'Free visa on arrival',
    highlights: ['Overwater villa stay', 'House-reef snorkel & dolphins', 'Sandbank picnic', 'Sunset dolphin cruise', 'Spa over the lagoon'],
  },
  {
    name: 'Turkey', slug: 'turkey', country: 'Istanbul + Cappadocia', region: 'Europe',
    from: 79999, nights: '6N/7D', packages: 5, img: U('1605283176568-9b41fde3672e'), tag: 'Trending',
    blurb: 'Where continents meet — bazaars, balloons and Byzantine domes.',
    overview: 'Turkey bridges Europe and Asia, and feels like both at once. Lose yourself in Istanbul’s Grand Bazaar and grand mosques, then fly to Cappadocia for the bucket-list sunrise: a sky full of hot-air balloons over fairy-chimney valleys. Add cave hotels and Turkish breakfasts for a trip that feels straight out of a film.',
    bestTime: 'Apr – Jun · Sep – Nov',
    flight: '~7h direct from Mumbai',
    visa: 'e-visa, handled by us',
    highlights: ['Cappadocia sunrise balloon ride', 'Hagia Sophia & Blue Mosque', 'Bosphorus dinner cruise', 'Grand Bazaar & spice market', 'Goreme cave-hotel stay'],
  },
];

const PACKAGES = [
  {
    title: 'Bali Beach & Ubud Escape', slug: 'bali-beach-ubud-escape',
    place: 'Bali, Indonesia', dest: 'bali',
    nights: '6N/7D', price: 54999, strike: 68000, rating: 4.9, reviews: 312,
    img: U('1604999333679-b86d54738315', 1100),
    fallbackImg: U('1537996194471-e657df975ab4', 1100),
    inclusions: ['Return flights','4★ hotels','Visa on arrival','Daily breakfast','3 guided tours','Airport transfers'],
    cities: ['Seminyak','Ubud','Nusa Penida'],
    badge: 'Best Seller',
    overview: 'Two halves of Bali in one trip: arty, jungle-wrapped Ubud and the beach-club buzz of Seminyak, with a speedboat day to the cliffs of Nusa Penida.',
    itinerary: [
      ['Arrive in Bali', 'Airport pickup, transfer to your Seminyak hotel, sunset stroll on the beach and welcome dinner.'],
      ['Seminyak & Tanah Lot', 'Beach morning at leisure, afternoon temple visit to Tanah Lot for the famous sea-temple sunset.'],
      ['Transfer to Ubud', 'Drive to Ubud via the Tegallalang rice terraces, swing photo-stop and a coffee-plantation tasting.'],
      ['Ubud highlights', 'Monkey Forest, Ubud Palace and art market, with an evening Kecak fire dance.'],
      ['Nusa Penida day-trip', 'Speedboat to Nusa Penida — Kelingking Beach viewpoint, Angel’s Billabong and snorkelling.'],
      ['Free day', 'Optional spa, white-water rafting or a cooking class. Last-night dinner in Ubud.'],
      ['Departure', 'Breakfast, check-out and transfer to the airport for your flight home.'],
    ],
  },
  {
    title: 'Dubai Desert + Skyline', slug: 'dubai-desert-skyline',
    place: 'Dubai, UAE', dest: 'dubai',
    nights: '4N/5D', price: 39999, strike: 52000, rating: 4.8, reviews: 521,
    img: U('1512453979798-5ea266f8880c', 1100),
    inclusions: ['Return flights','5★ hotel','Burj Khalifa entry','Desert safari','Dhow cruise','Visa'],
    cities: ['Dubai Marina','Downtown','Desert'],
    badge: 'Weekend break',
    overview: 'The greatest hits of Dubai over a long weekend — sky-high views, a desert safari with BBQ, and a glittering dinner cruise, all from a 5★ base.',
    itinerary: [
      ['Arrive in Dubai', 'Meet & greet, transfer to your 5★ hotel and an evening at Dubai Marina.'],
      ['City tour & Burj Khalifa', 'Old & new Dubai tour, then sunset entry to the Burj Khalifa observation deck.'],
      ['Desert safari', 'Day free to shop, afternoon red-dune safari with dune-bashing, camel ride and BBQ dinner.'],
      ['Dhow cruise', 'Optional Atlantis Aquaventure or a creek day, evening dhow dinner cruise.'],
      ['Departure', 'Breakfast and airport transfer for your flight home.'],
    ],
  },
  {
    title: 'Swiss Alps Honeymoon', slug: 'swiss-alps-honeymoon',
    place: 'Switzerland', dest: 'switzerland',
    nights: '7N/8D', price: 124999, strike: 159000, rating: 4.95, reviews: 86,
    img: U('1530122037265-a5f1f91d3b99', 1100),
    inclusions: ['Return flights','Boutique stays','Swiss travel pass','Jungfrau ascent','Mt Titlis','Lake Lucerne cruise'],
    cities: ['Zurich','Interlaken','Lucerne'],
    badge: 'Romantic',
    overview: 'A slow, scenic loop through the Alps for two — cogwheel trains to snowy summits, lake cruises and chocolate-box towns, with a Swiss Travel Pass that opens every door.',
    itinerary: [
      ['Arrive in Zurich', 'Airport pickup, train to Interlaken, evening walk along the Höheweg promenade.'],
      ['Jungfraujoch', 'Cogwheel railway to the Top of Europe — glaciers, Ice Palace and Sphinx viewpoint.'],
      ['Lauterbrunnen valley', 'Waterfall valley, Trümmelbach Falls and an optional paraglide over the meadows.'],
      ['Transfer to Lucerne', 'Scenic train to Lucerne, Chapel Bridge and old-town evening.'],
      ['Mt Titlis', 'Rotating cable-car to the glacier, Cliff Walk suspension bridge and snow play.'],
      ['Lake Lucerne cruise', 'Steamer cruise on the lake, free afternoon for shopping and chocolate.'],
      ['Free day / Zurich', 'Leisure day or transfer to Zurich for the old town and lakefront.'],
      ['Departure', 'Breakfast and transfer to Zurich airport.'],
    ],
  },
  {
    title: 'Thailand Twin Cities', slug: 'thailand-twin-cities',
    place: 'Phuket + Krabi', dest: 'thailand',
    nights: '6N/7D', price: 44999, strike: 58000, rating: 4.7, reviews: 412,
    img: U('1528181304800-259b08848526', 1100),
    inclusions: ['Return flights','Beach resorts','Phi Phi islands','James Bond island','Tiger Cave temple','Visa'],
    cities: ['Phuket','Krabi','Phi Phi'],
    badge: 'Beach lover',
    overview: 'Two beach bases, endless islands. Speedboat to Phi Phi and James Bond Island, climb to a clifftop temple, and soak up Phuket and Krabi’s very different vibes.',
    itinerary: [
      ['Arrive in Phuket', 'Transfer to your beach resort, evening at Patong or Kata beach.'],
      ['Phi Phi islands', 'Full-day speedboat to Phi Phi, Maya Bay and Bamboo Island with snorkelling.'],
      ['Phuket at leisure', 'Old Town, Big Buddha and Promthep Cape sunset, or a free beach day.'],
      ['Transfer to Krabi', 'Scenic transfer, Ao Nang beach evening and night market.'],
      ['James Bond Island', 'Phang Nga Bay tour by long-tail and sea-kayak through hidden lagoons.'],
      ['Tiger Cave Temple', 'Sunrise climb for the viewpoint, afternoon free for a Thai massage.'],
      ['Departure', 'Breakfast and transfer to the airport.'],
    ],
  },
  {
    title: 'Singapore Family Joy', slug: 'singapore-family-joy',
    place: 'Singapore', dest: 'singapore',
    nights: '4N/5D', price: 49999, strike: 64000, rating: 4.85, reviews: 268,
    img: U('1525625293386-3f8f99389edd', 1100),
    inclusions: ['Return flights','Hotel near Sentosa','Universal Studios','Sentosa pass','Night safari','Marina cruise'],
    cities: ['Sentosa','Marina Bay','Orchard'],
    badge: 'Family pick',
    overview: 'A family trip with everything: theme-park thrills on Sentosa, a Night Safari, the Gardens by the Bay light show and a Marina Bay cruise — all close and easy.',
    itinerary: [
      ['Arrive in Singapore', 'Transfer to your hotel near Sentosa, evening at Clarke Quay.'],
      ['Universal Studios', 'Full day at Universal Studios Sentosa with skip-the-line passes.'],
      ['Gardens & Marina Bay', 'Gardens by the Bay, Cloud Forest and the Supertree light show.'],
      ['Night Safari', 'City tour, Sentosa cable-car, evening Night Safari tram ride.'],
      ['Departure', 'Breakfast, last-minute Orchard Road shopping and airport transfer.'],
    ],
  },
  {
    title: 'Maldives Overwater', slug: 'maldives-overwater',
    place: 'Maafushi atoll', dest: 'maldives',
    nights: '4N/5D', price: 89999, strike: 119000, rating: 4.92, reviews: 142,
    img: U('1514282401047-d79a71a590e8', 1100),
    inclusions: ['Return flights','Overwater villa','Speedboat transfer','All meals','Snorkel + dolphin trip','Spa credit'],
    cities: ['Male','Maafushi'],
    badge: 'Luxury',
    overview: 'Pure island time: an overwater villa, a reef teeming with life on your doorstep, all meals taken care of and a sandbank picnic with nobody else in sight.',
    itinerary: [
      ['Arrive in Male', 'Speedboat transfer to your resort, check into the overwater villa, sunset welcome.'],
      ['Reef & lagoon', 'House-reef snorkelling, kayaking and a lazy afternoon on the deck.'],
      ['Dolphins & sandbank', 'Morning dolphin cruise and a private sandbank picnic, evening spa credit.'],
      ['Island at leisure', 'Free day for water sports or simply the hammock over the lagoon.'],
      ['Departure', 'Breakfast and speedboat back to Male for your flight home.'],
    ],
  },
];

const TESTIMONIALS = [
  {
    quote: "We were dreading the Schengen paperwork — CityView did all of it. The Switzerland trip went exactly as planned, even the train passes were waiting at our hotel.",
    name: 'Priya & Arjun Mehta',
    where: 'Mumbai → Switzerland',
    avatar: U('1494790108377-be9c29b29330', 200),
    rating: 5,
  },
  {
    quote: "Best Bali honeymoon we could've asked for. The Ubud villa was a dream. The on-trip helpline saved us twice — once at 1 AM. Worth every rupee.",
    name: 'Faraz & Maryam',
    where: 'Dubai → Bali',
    avatar: U('1535713875002-d1d0cf377fde', 200),
    rating: 5,
  },
  {
    quote: "Took my parents on the Singapore + KL combo. Hotels were great, transfers always on time. The visa process was completely handled — they didn't even step out of home.",
    name: 'Rakesh Sundaram',
    where: 'Bengaluru → SG+KL',
    avatar: U('1507003211169-0a1dd7228f2d', 200),
    rating: 5,
  },
  {
    quote: "I'm a solo traveler and was nervous about Turkey. CityView's local concierge replied in minutes, every time. Cappadocia balloon at sunrise — life changing.",
    name: 'Anika Bose',
    where: 'Kolkata → Turkey',
    avatar: U('1438761681033-6461ffad8d80', 200),
    rating: 5,
  },
];

const DEALS = [
  { title: 'Dubai 4N flat',    slug: 'dubai-4n-flat',    to: 'package/dubai-desert-skyline',   sub: '₹39,999 · all-in', tag: 'Limited',  bg: '#fff3d6', accent: '#7a5300', expires: '12 Jun', off: '24% off', img: U('1512453979798-5ea266f8880c', 900) },
  { title: 'Bali –20% off',    slug: 'bali-20-off',      to: 'package/bali-beach-ubud-escape', sub: 'Honeymoon special', tag: 'Romantic', bg: '#ffe3e7', accent: '#8a1735', expires: '30 Jun', off: '20% off', img: U('1537996194471-e657df975ab4', 900) },
  { title: 'Singapore + KL',   slug: 'singapore-kl',     to: 'package/singapore-family-joy',   sub: 'Combo from ₹52K',   tag: 'Combo',    bg: '#c6f4ec', accent: '#0e544a', expires: '15 Jul', off: 'Save ₹12K', img: U('1525625293386-3f8f99389edd', 900) },
  { title: 'Swiss 8N early',   slug: 'swiss-8n-early',   to: 'package/swiss-alps-honeymoon',   sub: 'Save up to ₹35K',    tag: 'Early bird', bg: '#e7eeff', accent: '#163b8a', expires: '20 Jul', off: 'Save ₹35K', img: U('1530122037265-a5f1f91d3b99', 900) },
];

const GUIDES = [
  {
    title: 'Schengen visa for Indian passports — the no-stress guide', slug: 'schengen-visa-guide',
    tag: 'Visa', read: '6 min', img: U('1517248135467-4c7edcad34c4'),
    excerpt: 'Everything an Indian traveller needs to file a Schengen visa with confidence — documents, timelines and the mistakes that cause rejections.',
    body: [
      'A Schengen visa lets you travel across 29 European countries on a single permit — but the paperwork trips up more first-time travellers than anything else. The good news: with the right documents in the right order, approval rates are very high.',
      'Start with the basics: a passport valid for at least three months beyond your return, two recent photos to ICAO spec, confirmed return flights and hotel bookings, and travel insurance covering at least €30,000. The consulate also wants to see that you’ll come home — so salary slips, six months of bank statements and a leave letter from your employer matter more than people expect.',
      'Apply through the right embassy: the country where you’ll spend the most nights, or your first point of entry if nights are equal. Book your appointment early — summer slots fill weeks ahead. Carry originals plus one set of copies, and never inflate your bank balance with a sudden deposit; consulates read statements closely.',
      'CityView files the whole application for you: we assemble the dossier, book the appointment, prep you for any interview and track the decision. Our travellers see a 98% approval rate — and if anything’s missing, we catch it before it reaches the consulate.',
    ],
  },
  {
    title: 'Best time to visit Bali (and what most travelers miss)', slug: 'best-time-to-visit-bali',
    tag: 'Asia', read: '4 min', img: U('1537996194471-e657df975ab4'),
    excerpt: 'Dry season, shoulder season, festival season — when to go to Bali for the weather, the prices and the quiet you’re actually after.',
    body: [
      'Bali has two seasons: dry (April–October) and wet (November–March). Dry season is the classic window — blue skies, calm seas and perfect for island-hopping to Nusa Penida. It’s also the busiest and priciest, especially July and August.',
      'The sweet spot is the shoulder months — April, May, June and September. You get dry-season weather without peak-season crowds or prices, and the rice terraces are at their greenest right after the rains.',
      'Wet season isn’t a write-off. Rain usually comes in short afternoon bursts, mornings stay bright, and you’ll find the lowest prices of the year plus a lush, dramatic landscape. Just keep beach days flexible and build in buffer time for boat transfers.',
      'What most travellers miss: Nyepi, Bali’s Day of Silence (March), when the whole island — including the airport — shuts down for 24 hours. Plan around it, or lean in for one of the most unique experiences in Asia.',
    ],
  },
  {
    title: 'Dubai on a long weekend: a Friday-to-Monday itinerary', slug: 'dubai-long-weekend',
    tag: 'Weekend', read: '5 min', img: U('1512453979798-5ea266f8880c'),
    excerpt: 'Four days, zero wasted hours — the perfect Dubai long weekend, from desert dunes to the top of the Burj Khalifa.',
    body: [
      'Dubai is built for the long weekend: a short flight, a fast visa and a city that runs late. Land Friday morning, drop your bags and head straight to Dubai Marina for lunch and a stroll along the waterfront.',
      'Friday evening, go up the Burj Khalifa for sunset — book the 124th-floor deck in advance to skip the queues. Follow it with a slow dinner in Downtown and the Dubai Fountain show.',
      'Saturday is desert day. Spend the morning shopping or at the beach, then ride out for an afternoon dune-bashing safari with a BBQ dinner and stargazing under the open sky.',
      'Sunday, dive into Old Dubai — the gold and spice souks, a one-dirham abra ride across the Creek, and a dhow dinner cruise after dark. Keep Monday morning light for a final swim before your afternoon flight. Four days, and you’ll have seen the very best of the city.',
    ],
  },
  {
    title: 'Asia vs Europe: where should your first trip abroad be?', slug: 'asia-vs-europe-first-trip',
    tag: 'Picks', read: '7 min', img: U('1530122037265-a5f1f91d3b99'),
    excerpt: 'Budget, visas, flight time and vibe — an honest comparison to help you pick the right first holiday abroad.',
    body: [
      'For a first trip abroad from India or the Gulf, the choice usually comes down to Asia or Europe — and they offer very different holidays for very different budgets.',
      'Asia wins on ease and value. Destinations like Bali, Thailand, Dubai and the Maldives mean short flights, visa-on-arrival or quick e-visas, and prices that stretch much further. It’s the lower-stress, higher-sun option — ideal if you want maximum holiday for the money.',
      'Europe rewards a little more planning. Switzerland, Turkey and beyond mean longer flights and a Schengen visa, but the payoff is world-class scenery, rail travel and history. Budget more per day, and give yourself at least a week to make the journey worth it.',
      'Our rule of thumb: if it’s your first international trip, you’re travelling with kids or parents, or you want barefoot beach time, start in Asia. If it’s a milestone honeymoon or a bucket-list landscape you’re chasing, Europe is worth the extra effort — and we’ll handle the visa either way.',
    ],
  },
];

const TRUST_LOGOS = [
  'IATA', 'TripAdvisor', 'Booking.com', 'Emirates', 'Singapore Airlines', 'Marriott Bonvoy', 'Accor', 'BFA', 'TAAI',
];

const MODES = [
  { id: 'honeymoon', label: 'Honeymoon', icon: 'Heart' },
  { id: 'family',    label: 'Family',    icon: 'UsersIcon' },
  { id: 'group',     label: 'Group tour',icon: 'Compass' },
  { id: 'solo',      label: 'Solo',      icon: 'Globe' },
  { id: 'visa',      label: 'Visa only', icon: 'Stamp' },
];

Object.assign(window, {
  HERO_REEL, DESTINATIONS, PACKAGES, TESTIMONIALS, DEALS, GUIDES, TRUST_LOGOS, MODES,
  U, slugify, buildGallery, GALLERY_POOL,
});
