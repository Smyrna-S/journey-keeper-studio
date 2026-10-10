import { Destination } from '../types';
import { DESTINATION_COORDINATES } from './destinationCoordinates';

const RAW_DESTINATIONS: Destination[] = [
  {
    id: 'N01',
    category: 'Nature',
    destination: 'Pichavaram',
    district: 'Cuddalore',
    experience: 'Mangrove exploration',
    mission: 'Explore the mangrove waterways by boat and spot rare waterbirds',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: 'Half Day',
    season: 'November–February',
    coins: 50,
    gemScore: 8,
    // Authentic Pichavaram Mangrove Forests & Canals
    image: '/__l5e/assets-v1/8d752901-57b9-4758-a43d-a20f81a3c3cb/pichavaram-1.jpg',
    images: [
      '/__l5e/assets-v1/8d752901-57b9-4758-a43d-a20f81a3c3cb/pichavaram-1.jpg',
      '/__l5e/assets-v1/5cc23d79-3615-481b-82a9-03058b99f310/pichavaram-2.jpg',
      '/__l5e/assets-v1/3436b63a-753a-453e-bd18-e43a2aa1d5bb/pichavaram-3.jpg'
    ],
    description: 'The world’s second largest mangrove forest, Pichavaram features 4,400 interconnected canals surrounded by vibrant flora and migrating birds.',
    whySpecial: 'One of the rare places in India where you can glide through deep natural mangrove arches by rowboat.',
    howToReach: 'Located 15 km from Chidambaram railway station, well-connected by bus and taxi.'
  },
  {
    id: 'N02',
    category: 'Nature',
    destination: 'Kolli Hills',
    district: 'Namakkal',
    experience: 'Mountain exploration',
    mission: 'Conquer the 70 hairpin bends and trek to Agaya Gangai waterfall',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–February',
    coins: 60,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Known as the "Mountains of Death" in ancient Tamil literature, this serene hill range remains untamed by commercial tourism.',
    whySpecial: 'Home to 70 thrilling hairpin bends, medicinal plant gardens, and the roaring Agaya Gangai falls.',
    howToReach: '55 km from Namakkal; hire a local cab or ride the famous mountain ghat road.'
  },
  {
    id: 'N03',
    category: 'Nature',
    destination: 'Meghamalai',
    district: 'Theni',
    experience: 'Tea estate exploration',
    mission: 'Walk through organic high-altitude tea gardens and spot wild elephants at the lake',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'September–March',
    coins: 60,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High Waves Mountain: a misty paradise of emerald tea plantations, cardamon valleys, and secluded waterfalls in the Western Ghats.',
    whySpecial: 'Unspoiled biodiversity hotspot with sweeping views of the Varusanadu Hills and spice aromas.',
    howToReach: 'Approach from Chinnamanur (40 km uphill); scenic private or shared 4x4 cabs available.'
  },
  {
    id: 'N04',
    category: 'Nature',
    destination: 'Valparai',
    district: 'Coimbatore',
    experience: 'Tea estate and wildlife exploration',
    mission: 'Ascend 40 hairpin bends and spot the elusive Nilgiri Tahr in Anamalai',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 70,
    gemScore: 8,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Perched 3,500 ft above sea level in the Anamalai Tiger Reserve, surrounded by rainforests and tea carpets.',
    whySpecial: 'Cleanest mountain air with high density of Great Hornbills, Lion-tailed Macaques, and tea heritage.',
    howToReach: '64 km from Pollachi via the spectacular 40-hairpin mountain pass.'
  },
  {
    id: 'N05',
    category: 'Nature',
    destination: 'Courtallam',
    district: 'Tenkasi',
    experience: 'Waterfall exploration',
    mission: 'Take an herbal bath at the Main Falls and taste natural mountain spring water',
    difficulty: 'Easy',
    budget: '₹',
    duration: 'Half Day',
    season: 'June–September',
    coins: 50,
    gemScore: 8,
    image: '/__l5e/assets-v1/deb1ce16-9507-4926-942c-4cc573bdf4ad/courtallam-1.jpg',
    images: [
      '/__l5e/assets-v1/deb1ce16-9507-4926-942c-4cc573bdf4ad/courtallam-1.jpg',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Revered as the "Spa of South India", the falls flow through dense forests of medicinal herbs and ayurvedic vegetation.',
    whySpecial: 'The waters are infused with therapeutic herbal properties from the Agasthiyar hills.',
    howToReach: '6 km from Tenkasi railway junction, reachable by regular buses and autos.'
  },
  {
    id: 'N06',
    category: 'Nature',
    destination: 'Kodaikanal',
    district: 'Dindigul',
    experience: 'Lakeside and hill landscape exploration',
    mission: 'Hike to secluded pine forest glades beyond the crowded tourist viewpoints',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'April–June',
    coins: 70,
    gemScore: 8,
    // Pine forest and misty hill trails in Kodaikanal (Western Ghats)
    image: '/__l5e/assets-v1/34e77a07-89f5-47b8-92f3-7c111187a78f/kodaikanal-1.jpg',
    images: [
      '/__l5e/assets-v1/34e77a07-89f5-47b8-92f3-7c111187a78f/kodaikanal-1.jpg',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The Princess of Hill Stations, renowned for misty valleys, star-shaped lake, eucalyptus groves, and rare Kurinji blossoms.',
    whySpecial: 'Hidden nature trails, quaint colonial stone cottages, and crisp pine tree fragrances.',
    howToReach: '80 km from Kodai Road railway station; buses and taxis connect directly.'
  },
  {
    id: 'N07',
    category: 'Nature',
    destination: 'Javadi Hills',
    district: 'Tiruvannamalai',
    experience: 'Hill and forest landscape exploration',
    mission: 'Visit Vainu Bappu Observatory and stargaze under pristine non-polluted skies',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–February',
    coins: 65,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An extension of the Eastern Ghats known for fruit orchards, sandalwood forests, and tranquil remote tribal villages.',
    whySpecial: 'Houses Asia’s prime optical telescope observatory (Kavalur) due to unmatched dark night skies.',
    howToReach: 'Accessible from Jolarpettai (35 km) or Tiruvannamalai (75 km).'
  },
  {
    id: 'N08',
    category: 'Nature',
    destination: 'Mudumalai',
    district: 'Nilgiris',
    experience: 'Wildlife and forest exploration',
    mission: 'Spot Asian elephant herds and peacocks during a morning forest safari',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–May',
    coins: 80,
    gemScore: 8,
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Situated at the tri-junction of Tamil Nadu, Kerala, and Karnataka in the Nilgiri Biosphere Reserve.',
    whySpecial: 'Ancient elephant corridors, Bengal tiger habitats, and dense teak & bamboo forests.',
    howToReach: 'Situated along the Ooty-Mysore highway, 30 km from Gudalur.'
  },
  {
    id: 'N09',
    category: 'Nature',
    destination: 'Point Calimere',
    district: 'Nagapattinam',
    experience: 'Coastal wildlife and wetland exploration',
    mission: 'Observe thousands of flamingos and wild blackbucks at the edge of the Palk Strait',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'November–February',
    coins: 70,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A low headland on the Coromandel Coast surrounded by salt pans, sand dunes, and mangrove wetlands.',
    whySpecial: 'Crucial stopover on the Central Asian Flyway for thousands of migratory Greater Flamingos.',
    howToReach: '60 km from Nagapattinam, reached via Vedaranyam.'
  },
  {
    id: 'N10',
    category: 'Nature',
    destination: 'Manimuthar',
    district: 'Tirunelveli',
    experience: 'Waterfall and forest landscape exploration',
    mission: 'Swim in the cool natural rock pool beneath Manimuthar Falls',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: 'Half Day',
    season: 'October–February',
    coins: 65,
    gemScore: 8,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Located in the Kalakad Mundanthurai Tiger Reserve, Manimuthar features crystal cascading falls and a massive dam.',
    whySpecial: 'Deep freshwater pools surrounded by thick evergreen rainforest canopy.',
    howToReach: '45 km from Tirunelveli city; private vehicles or rental cabs recommended.'
  },
  {
    id: 'C01',
    category: 'Culture & Heritage',
    destination: 'Thanjavur',
    district: 'Thanjavur',
    experience: 'Chola heritage and temple exploration',
    mission: 'Witness the monolithic shadowless vimana and bronze gallery at Brihadisvara Temple',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 60,
    gemScore: 9,
    // Brihadisvara Great Chola temple vimana granite architecture
    image: '/__l5e/assets-v1/448a5c36-b30f-4b0f-9161-127105ee5b8d/thanjavur-1.jpg',
    images: [
      '/__l5e/assets-v1/448a5c36-b30f-4b0f-9161-127105ee5b8d/thanjavur-1.jpg',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The ancient capital of the Great Living Cholas and cradle of classical Carnatic music, bronze sculpture, and Thanjavur painting.',
    whySpecial: 'The 1000-year-old Big Temple is an engineering marvel carved entirely from 130,000 tons of granite.',
    howToReach: 'Well connected by train; closest airport is Tiruchirappalli (TRZ, 55 km).'
  },
  {
    id: 'C02',
    category: 'Culture & Heritage',
    destination: 'Mahabalipuram',
    district: 'Chengalpattu',
    experience: 'Shore Temple and rock-cut monument exploration',
    mission: 'Decode the legend carved on Arjuna’s Penance and inspect Krishna’s Butter Ball',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 60,
    gemScore: 8,
    image: '/__l5e/assets-v1/0a21296a-c079-40ca-b321-3bd0ca4f4ddf/mahabalipuram-1.jpg',
    images: [
      '/__l5e/assets-v1/0a21296a-c079-40ca-b321-3bd0ca4f4ddf/mahabalipuram-1.jpg',
      '/__l5e/assets-v1/3c9d3b96-4722-41e2-b322-c9de71d580ec/mahabalipuram-2.jpg',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '7th-century Pallava seaport sanctuary filled with rock-cut caves, monolithic rathas, and the iconic coastal Shore Temple.',
    whySpecial: 'UNESCO World Heritage monument open to ocean breezes and ancient maritime stone carving traditions.',
    howToReach: '55 km south of Chennai via the scenic East Coast Road (ECR).'
  },
  {
    id: 'C03',
    category: 'Culture & Heritage',
    destination: 'Madurai',
    district: 'Madurai',
    experience: 'Temple and cultural heritage exploration',
    mission: 'Walk the thousand-pillar hall and experience the night chariot ceremony at Meenakshi Amman',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 60,
    gemScore: 8,
    // Magnificent Dravidian gopuram of Meenakshi Temple, Madurai
    image: '/__l5e/assets-v1/79a7bb2f-affe-49f6-869c-ccca7ca99cdd/madurai-1.jpg',
    images: [
      '/__l5e/assets-v1/79a7bb2f-affe-49f6-869c-ccca7ca99cdd/madurai-1.jpg',
      'https://images.unsplash.com/photo-1621682372775-533449e550ed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'One of the oldest continuously inhabited cities on Earth, built in the shape of a sacred lotus around the Meenakshi temple.',
    whySpecial: 'Vibrant living temple culture with towering gopurams decorated with thousands of colorful mythological figures.',
    howToReach: 'Madurai International Airport (IXM) & junction station connect all major cities.'
  },
  {
    id: 'C04',
    category: 'Culture & Heritage',
    destination: 'Chettinad',
    district: 'Sivaganga',
    experience: 'Chettiar heritage and mansion exploration',
    mission: 'Tour a 100-room heritage mansion with Burmese teak pillars and Italian marble floors',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 70,
    gemScore: 9,
    // Chettinad: Palatial heritage mansions with Burmese teak courtyards
    image: '/__l5e/assets-v1/9dde5594-0862-4198-9627-d33774d24f61/chettinad-1.jpg',
    images: [
      '/__l5e/assets-v1/9dde5594-0862-4198-9627-d33774d24f61/chettinad-1.jpg',
      '/__l5e/assets-v1/49d0eb2f-85dd-41ad-aa04-0191d3e871fa/chettinad-2.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A cluster of heritage villages created by the mercantile Chettiar community, famed for palatial architecture and Athangudi tiles.',
    whySpecial: 'Palatial mansions built with Burmese teak, Belgian stained glass, and courtyard water harvesting.',
    howToReach: '90 km from Tiruchirappalli (Trichy) airport; Kanadukathan is the main village.'
  },
  {
    id: 'C05',
    category: 'Culture & Heritage',
    destination: 'Kanchipuram',
    district: 'Kanchipuram',
    experience: 'Temple and silk heritage exploration',
    mission: 'Visit a traditional weaver cooperative and inspect the historic stone carvings of Kailasanathar Temple',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 60,
    gemScore: 8,
    // Ancient stone carved temple pillars of Kailasanathar & Kanchi temple heritage
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Kailayanathar10.jpg',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Kailayanathar10.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c2/Parameswara_Vinnagaram.JPG',
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The City of Thousand Temples and epicenter of world-renowned mulberry silk sarees woven with pure silver and gold zari.',
    whySpecial: 'Houses some of the earliest Dravidian stone shrines alongside generations of master silk weavers.',
    howToReach: '75 km west of Chennai on the Bengaluru national highway.'
  },
  {
    id: 'F01',
    category: 'Food',
    destination: 'Madurai',
    district: 'Madurai',
    experience: 'Jigarthanda and street-food trail',
    mission: 'Taste original Famous Jigarthanda and fresh Bun Parotta at night in Simmakkal',
    difficulty: 'Easy',
    budget: '₹',
    duration: 'Half Day',
    season: 'October–March',
    coins: 50,
    gemScore: 8,
    // Ultra-reliable high-res South Indian street feast / parotta & delicacies for Madurai
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Madurai’s midnight food culture is legendary: crispy Bun Parottas, mutton chukka, spicy kari dosai, and sweet creamy Jigarthanda.',
    whySpecial: 'Jigarthanda—a royal drink made with almond gum, reduced milk, nannari syrup, and ice cream.',
    howToReach: 'Take an evening stroll down Town Hall Road or East Marret Street.'
  },
  {
    id: 'F02',
    category: 'Food',
    destination: 'Coimbatore',
    district: 'Coimbatore',
    experience: 'Kongunadu cuisine exploration',
    mission: 'Taste authentic Pallipalayam chicken, Arisi Paruppu Sadam, and freshly ground coconut curries',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: 'Half Day',
    season: 'October–March',
    coins: 50,
    gemScore: 8,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Kongunadu cuisine relies on roasted spices, minimal oil, native shallow-fried dishes, and pure country milk products.',
    whySpecial: 'Distinctive indigenous flavors seasoned with turmeric, coconut, and shallots with no heavy marinades.',
    howToReach: 'Explore traditional mess halls around Gandhipuram and RS Puram.'
  },
  {
    id: 'F03',
    category: 'Food',
    destination: 'Tirunelveli',
    district: 'Tirunelveli',
    experience: 'Tirunelveli Halwa and local food trail',
    mission: 'Buy warm wheat halwa served on a fresh lotus leaf at the historic Iruttu Kadai',
    difficulty: 'Easy',
    budget: '₹',
    duration: 'Half Day',
    season: 'October–March',
    coins: 40,
    gemScore: 9,
    // Tirunelveli: Glistening golden-amber wheat halwa cooked in pure ghee
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Famous worldwide for its translucent, ghee-dripping wheat halwa prepared using the mineral-rich waters of the Thamirabarani River.',
    whySpecial: 'The famous "Twilight Shop" (Iruttu Kadai) opens for only a few hours at dusk lit by a single bulb.',
    howToReach: 'Adjacent to the Nellaiappar temple car street, Tirunelveli.'
  },
  {
    id: 'F04',
    category: 'Food',
    destination: 'Thanjavur',
    district: 'Thanjavur',
    experience: 'Traditional Tamil cuisine experience',
    mission: 'Savor a traditional plantain leaf feast featuring Kadappa, Sambhar, and Ash Gourd Mor Kuzhambu',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: 'Half Day',
    season: 'October–March',
    coins: 50,
    gemScore: 8,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The fertile Cauvery Delta is the rice bowl of Tamil Nadu, known for slow-cooked spiced lentils and fragrant filter coffee.',
    whySpecial: 'Original home of Maratha and Chola culinary fusion, giving rise to unique sambar varieties.',
    howToReach: 'Traditional messes and temple dining halls around South Rampart.'
  },
  {
    id: 'F05',
    category: 'Food',
    destination: 'Dindigul',
    district: 'Dindigul',
    experience: 'Dindigul biryani and local food experience',
    mission: 'Sample traditional Thalappakatti biryani made with tiny Seeraga Samba rice and tender country meat',
    difficulty: 'Easy',
    budget: '₹₹',
    duration: 'Half Day',
    season: 'October–March',
    coins: 50,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The undisputed origin of South India’s most aromatic Seeraga Samba mutton biryani, cooked with black pepper and curds.',
    whySpecial: 'Small grain rice cooked with wood fire, yielding a delicate texture unlike long-grain basmati.',
    howToReach: 'Along the NH44 highway strip or near Dindigul Clock Tower.'
  },
  {
    id: 'A01',
    category: 'Adventure',
    destination: 'Yercaud',
    district: 'Salem',
    experience: 'Hill trekking and adventure exploration',
    mission: 'Trek the Tipperary Viewpoint trail and explore the underground labyrinth of Kiliyur Falls',
    difficulty: 'Moderate',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–February',
    coins: 70,
    gemScore: 8,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Perched in the Shevaroy Hills of the Eastern Ghats, Yercaud offers steep forested trails and 300-foot waterfall descents.',
    whySpecial: 'Offbeat trekking trails winding through coffee plantations, spice gardens, and orange orchards.',
    howToReach: '30 km of winding ghat road from Salem railway junction.'
  },
  {
    id: 'A02',
    category: 'Adventure',
    destination: 'Kolli Hills',
    district: 'Namakkal',
    experience: 'Mountain trekking and waterfall adventure',
    mission: 'Descend all 1,025 stone steps to Agaya Gangai waterfall and climb back up',
    difficulty: 'Moderate',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–February',
    coins: 75,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A physically demanding descent into a deep gorge where the river drops 300 feet surrounded by vertical rock faces.',
    whySpecial: 'One of the most intense stair treks in South India with sheer geological beauty.',
    howToReach: 'Base trailhead near Arapaleeswarar Temple in Kolli Hills.'
  },
  {
    id: 'A03',
    category: 'Adventure',
    destination: 'Hogenakkal',
    district: 'Dharmapuri',
    experience: 'River adventure and coracle ride',
    mission: 'Navigate the swirling Kaveri river rapids in a hand-woven circular basket boat (Parisal)',
    difficulty: 'Moderate',
    budget: '₹₹',
    duration: 'Half Day',
    season: 'October–February',
    coins: 65,
    gemScore: 8,
    image: '/__l5e/assets-v1/d4883a64-0bde-4a60-a348-ae41afd9a499/hogenakkal-1.jpg',
    images: [
      '/__l5e/assets-v1/d4883a64-0bde-4a60-a348-ae41afd9a499/hogenakkal-1.jpg',
      '/__l5e/assets-v1/f29df992-080a-4edc-8dfe-fe6dd5c5611f/hogenakkal-2.jpg',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Often hailed as the "Niagara Falls of India", the Kaveri branches into numerous cascades through prehistoric carbonatite rocks.',
    whySpecial: 'Thrilling circular coracle boat rides right into the misty spray of thunderous waterfalls.',
    howToReach: '46 km from Dharmapuri, regular bus and taxi service available.'
  },
  {
    id: 'A04',
    category: 'Adventure',
    destination: 'Valparai',
    district: 'Coimbatore',
    experience: 'Forest adventure and wildlife exploration',
    mission: 'Night drive along the rainforest fringes to spot flying squirrels and wild bison',
    difficulty: 'Moderate',
    budget: '₹₹₹',
    duration: '2 Days',
    season: 'September–March',
    coins: 80,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-altitude wet evergreen forest corridors where wildlife traverses freely through private tea plantations.',
    whySpecial: 'Real frontier adventure with dense forest mist, rare amphibians, and leopard territory.',
    howToReach: 'Pollachi to Valparai forest check-post road.'
  },
  {
    id: 'A05',
    category: 'Adventure',
    destination: 'Topslip',
    district: 'Coimbatore',
    experience: 'Jungle trekking and wildlife adventure',
    mission: 'Complete an early morning elephant-guided nature hike through deep teak forests',
    difficulty: 'Moderate',
    budget: '₹₹',
    duration: '1 Day',
    season: 'October–March',
    coins: 75,
    gemScore: 9,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Located in the Anamalai Hills, Topslip was historically named for the practice of sliding timber logs down the slopes.',
    whySpecial: 'Guided forest walking trails through elephant camps, bird sanctuaries, and ancient bamboo groves.',
    howToReach: '35 km from Pollachi via Sethumadai forest entry checkpoint.'
  }
];

export const DESTINATIONS: Destination[] = RAW_DESTINATIONS.map((dest) => ({
  ...dest,
  coordinates: DESTINATION_COORDINATES[dest.id] || { lat: 11.1271, lng: 78.6569 },
}));

