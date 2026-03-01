export interface TrailPost {
  name: string;
  elevation: number;
  description: string;
  hasWater: boolean;
  hasShelter: boolean;
  distanceFromStart: number; // km
}

export interface Trail {
  id: string;
  name: string;
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Ekstrem";
  distance: number; // km
  estimatedTime: string;
  startPoint: string;
  posts: TrailPost[];
  description: string;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionIcon: string;
  visibility: number;
  uvIndex: number;
  updatedAt: string;
}

export interface Mountain {
  id: string;
  name: string;
  elevation: number;
  location: string;
  province: string;
  coordinates: { lat: number; lng: number };
  description: string;
  image: string;
  category: string;
  status: "Buka" | "Tutup" | "Waspada";
  trails: Trail[];
  weather: WeatherData;
  tips: string[];
  bestSeason: string;
  permitRequired: boolean;
}

export const mountains: Mountain[] = [
  {
    id: "rinjani",
    name: "Gunung Rinjani",
    elevation: 3726,
    location: "Lombok Utara",
    province: "Nusa Tenggara Barat",
    coordinates: { lat: -8.4119, lng: 116.4698 },
    description:
      "Gunung Rinjani adalah gunung berapi aktif tertinggi kedua di Indonesia. Terletak di Pulau Lombok, gunung ini menawarkan pemandangan danau kawah Segara Anak yang menakjubkan serta panorama alam yang spektakuler. Rinjani menjadi destinasi pendakian favorit para petualang dari seluruh dunia.",
    image:
      "https://images.unsplash.com/photo-1707650042645-f4123aeef0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMFJpbmphbmklMjBJbmRvbmVzaWElMjB2b2xjYW5vfGVufDF8fHx8MTc3MjIxMDk1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gunung Berapi",
    status: "Buka",
    bestSeason: "April - Oktober",
    permitRequired: true,
    weather: {
      temperature: 8,
      feelsLike: 4,
      humidity: 72,
      windSpeed: 18,
      condition: "Berawan",
      conditionIcon: "🌥️",
      visibility: 8,
      uvIndex: 3,
      updatedAt: "27 Feb 2026, 08:00 WIB",
    },
    trails: [
      {
        id: "senaru",
        name: "Jalur Senaru",
        difficulty: "Sulit",
        distance: 18.5,
        estimatedTime: "2-3 hari",
        startPoint: "Desa Senaru (601 mdpl)",
        description:
          "Jalur paling populer menuju puncak Rinjani melewati hutan tropis lebat dan pemandangan indah Segara Anak.",
        posts: [
          {
            name: "Pos 1 – Senaru",
            elevation: 1500,
            description: "Pos awal dengan shelter dan toilet",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 2.5,
          },
          {
            name: "Pos 2 – Tengengean",
            elevation: 2000,
            description: "Area camping dengan pemandangan hutan",
            hasWater: true,
            hasShelter: false,
            distanceFromStart: 6.0,
          },
          {
            name: "Pos 3 – Pelawangan Senaru",
            elevation: 2641,
            description: "Camping area di tepi kawah, view danau Segara Anak",
            hasWater: false,
            hasShelter: true,
            distanceFromStart: 10.5,
          },
          {
            name: "Danau Segara Anak",
            elevation: 2008,
            description: "Danau kawah berwarna biru kehijauan yang menakjubkan",
            hasWater: true,
            hasShelter: false,
            distanceFromStart: 14.0,
          },
          {
            name: "Puncak Rinjani",
            elevation: 3726,
            description: "Puncak tertinggi dengan panorama 360 derajat",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 18.5,
          },
        ],
      },
      {
        id: "sembalun",
        name: "Jalur Sembalun",
        difficulty: "Ekstrem",
        distance: 21.0,
        estimatedTime: "3-4 hari",
        startPoint: "Desa Sembalun (1156 mdpl)",
        description:
          "Jalur terpanjang namun menawarkan pemandangan padang savana yang luar biasa.",
        posts: [
          {
            name: "Pos 1 – Sembalun",
            elevation: 1400,
            description: "Pintu masuk dengan fasilitas lengkap",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 2.0,
          },
          {
            name: "Pos 2 – Padang Savana",
            elevation: 1800,
            description: "Padang rumput luas dengan pemandangan indah",
            hasWater: true,
            hasShelter: false,
            distanceFromStart: 6.5,
          },
          {
            name: "Pos 3 – Pelawangan Sembalun",
            elevation: 2639,
            description: "Camping area strategis sebelum summit attack",
            hasWater: false,
            hasShelter: true,
            distanceFromStart: 12.0,
          },
          {
            name: "Puncak Rinjani",
            elevation: 3726,
            description: "Puncak tertinggi Rinjani",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 21.0,
          },
        ],
      },
    ],
    tips: [
      "Persiapkan fisik minimal 3 bulan sebelum pendakian",
      "Bawa sleeping bag dengan rating -5°C",
      "Selalu bawa rain cover untuk carrier",
      "Daftarkan pendakian secara online via TNGR",
      "Bawa minimum 3L air per hari",
    ],
  },
  {
    id: "semeru",
    name: "Gunung Semeru",
    elevation: 3676,
    location: "Lumajang – Malang",
    province: "Jawa Timur",
    coordinates: { lat: -8.1075, lng: 112.9222 },
    description:
      "Semeru atau Mahameru adalah gunung tertinggi di Pulau Jawa dan salah satu gunung berapi paling aktif di Indonesia. Disebut sebagai 'Atap Jawa', Semeru menjadi impian bagi banyak pendaki Indonesia. Jalur pendakiannya melewati danau-danau cantik seperti Ranu Pani dan Ranu Kumbolo.",
    image:
      "https://images.unsplash.com/photo-1683772965002-67c1f0a6d5fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMFNlbWVydSUyMEphdmElMjBJbmRvbmVzaWF8ZW58MXx8fHwxNzcyMjEwOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gunung Berapi",
    status: "Waspada",
    bestSeason: "April – September",
    permitRequired: true,
    weather: {
      temperature: 5,
      feelsLike: 1,
      humidity: 85,
      windSpeed: 22,
      condition: "Berkabut",
      conditionIcon: "🌫️",
      visibility: 4,
      uvIndex: 1,
      updatedAt: "27 Feb 2026, 08:00 WIB",
    },
    trails: [
      {
        id: "ranu-pani",
        name: "Jalur Ranu Pani",
        difficulty: "Sulit",
        distance: 16.0,
        estimatedTime: "2-3 hari",
        startPoint: "Desa Ranu Pani (2100 mdpl)",
        description:
          "Satu-satunya jalur resmi pendakian Semeru yang melewati danau Ranu Kumbolo yang ikonik.",
        posts: [
          {
            name: "Ranu Pani",
            elevation: 2100,
            description: "Basecamp awal dengan fasilitas lengkap",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 0,
          },
          {
            name: "Ranu Kumbolo",
            elevation: 2390,
            description: "Danau indah tempat camping favorit pendaki",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 4.5,
          },
          {
            name: "Oro-Oro Ombo",
            elevation: 2500,
            description: "Padang bunga verbena biru yang memesona",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 6.0,
          },
          {
            name: "Kalimati",
            elevation: 2700,
            description: "Basecamp terakhir sebelum summit attack",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 10.0,
          },
          {
            name: "Arcopodo",
            elevation: 2900,
            description: "Area dua pohon ikonik sebelum puncak",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 12.5,
          },
          {
            name: "Puncak Mahameru",
            elevation: 3676,
            description: "Atap Pulau Jawa yang agung",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 16.0,
          },
        ],
      },
    ],
    tips: [
      "Pendakian menuju puncak hanya diperbolehkan 00:00 - 10:00 WIB",
      "Waspadai gas beracun di area puncak",
      "Bawa masker khusus untuk pendakian summit",
      "Kuota pendaki terbatas, daftar jauh-jauh hari",
      "Jangan mendekati kawah aktif Jonggring Seloko",
    ],
  },
  {
    id: "kerinci",
    name: "Gunung Kerinci",
    elevation: 3805,
    location: "Kayu Aro",
    province: "Jambi – Sumatera Barat",
    coordinates: { lat: -1.6966, lng: 101.2641 },
    description:
      "Kerinci adalah gunung berapi tertinggi di Indonesia dan puncak tertinggi di Sumatera. Terletak di jantung Taman Nasional Kerinci Seblat, gunung ini dikelilingi hutan hujan tropis yang kaya biodiversitas. Pendakian Kerinci menawarkan pengalaman alam Sumatera yang tak terlupakan.",
    image:
      "https://images.unsplash.com/photo-1727100828954-8759b3e98d21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHdW51bmclMjBLZXJpbmNpJTIwU3VtYXRyYSUyMGZvcmVzdHxlbnwxfHx8fDE3NzIyMTA5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gunung Berapi",
    status: "Buka",
    bestSeason: "Mei – September",
    permitRequired: true,
    weather: {
      temperature: 6,
      feelsLike: 2,
      humidity: 88,
      windSpeed: 15,
      condition: "Hujan Ringan",
      conditionIcon: "🌧️",
      visibility: 5,
      uvIndex: 1,
      updatedAt: "27 Feb 2026, 08:00 WIB",
    },
    trails: [
      {
        id: "kersik-tuo",
        name: "Jalur Kersik Tuo",
        difficulty: "Sulit",
        distance: 14.5,
        estimatedTime: "2-3 hari",
        startPoint: "Desa Kersik Tuo (1500 mdpl)",
        description:
          "Jalur utama pendakian Kerinci melewati hutan hujan tropis lebat khas Sumatera.",
        posts: [
          {
            name: "Pintu Rimba",
            elevation: 1850,
            description: "Gerbang masuk hutan dengan pos pemeriksaan",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 1.5,
          },
          {
            name: "Pos 1 – Bangku Panjang",
            elevation: 2150,
            description: "Area istirahat dengan tempat duduk panjang",
            hasWater: true,
            hasShelter: false,
            distanceFromStart: 4.0,
          },
          {
            name: "Pos 2 – Batas Hutan",
            elevation: 2600,
            description: "Batas hutan dengan area terbuka berbatu",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 8.5,
          },
          {
            name: "Pos 3 – Shelter",
            elevation: 3200,
            description: "Shelter terakhir sebelum puncak",
            hasWater: false,
            hasShelter: true,
            distanceFromStart: 11.0,
          },
          {
            name: "Puncak Indrapura",
            elevation: 3805,
            description: "Puncak tertinggi Indonesia di Sumatera",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 14.5,
          },
        ],
      },
    ],
    tips: [
      "Waspadai flora dan fauna dilindungi di TNKS",
      "Suhu malam bisa turun hingga 0°C",
      "Bawa repellent karena banyak lintah di hutan",
      "Izin pendakian wajib dari kantor TNKS",
      "Jangan tinggalkan sampah di jalur",
    ],
  },
  {
    id: "merbabu",
    name: "Gunung Merbabu",
    elevation: 3145,
    location: "Boyolali – Magelang",
    province: "Jawa Tengah",
    coordinates: { lat: -7.4556, lng: 110.4347 },
    description:
      "Gunung Merbabu adalah gunung bertipe strato yang menawarkan pemandangan sabana indah, hamparan bunga edelweiss, dan panorama gunung-gunung sekitarnya. Jalurnya yang bervariasi menjadikan Merbabu cocok untuk pendaki pemula hingga berpengalaman. Pemandangan sunrise dari puncaknya sangat memukau.",
    image:
      "https://images.unsplash.com/photo-1608965567908-8b6da618dadc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHdW51bmclMjBNZXJiYWJ1JTIwaGlraW5nJTIwdHJhaWx8ZW58MXx8fHwxNzcyMjEwOTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gunung Api Strato",
    status: "Buka",
    bestSeason: "April – Oktober",
    permitRequired: true,
    weather: {
      temperature: 12,
      feelsLike: 8,
      humidity: 65,
      windSpeed: 12,
      condition: "Cerah Berawan",
      conditionIcon: "⛅",
      visibility: 15,
      uvIndex: 5,
      updatedAt: "27 Feb 2026, 08:00 WIB",
    },
    trails: [
      {
        id: "selo",
        name: "Jalur Selo",
        difficulty: "Sedang",
        distance: 12.5,
        estimatedTime: "8-10 jam",
        startPoint: "Basecamp Selo (1560 mdpl)",
        description:
          "Jalur paling populer dengan pemandangan Gunung Merapi yang spektakuler sepanjang perjalanan.",
        posts: [
          {
            name: "Pos 1 – Gerbang Hutan",
            elevation: 1850,
            description: "Masuk kawasan hutan pinus yang rindang",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 2.0,
          },
          {
            name: "Pos 2 – Sabana 1",
            elevation: 2400,
            description: "Sabana pertama dengan rumput hijau luas",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 5.5,
          },
          {
            name: "Pos 3 – Sabana 2",
            elevation: 2700,
            description: "Sabana kedua tempat camping favorit",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 8.0,
          },
          {
            name: "Pos 4 – Kenteng Songo",
            elevation: 3050,
            description: "Area 9 batu bersejarah dekat puncak",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 10.5,
          },
          {
            name: "Puncak Syarif",
            elevation: 3119,
            description: "Puncak dengan edelweiss yang indah",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 12.0,
          },
          {
            name: "Puncak Triangulasi",
            elevation: 3145,
            description: "Titik tertinggi Gunung Merbabu",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 12.5,
          },
        ],
      },
      {
        id: "thekelan",
        name: "Jalur Thekelan",
        difficulty: "Mudah",
        distance: 10.5,
        estimatedTime: "7-9 jam",
        startPoint: "Basecamp Thekelan (1450 mdpl)",
        description:
          "Jalur lebih pendek cocok untuk pendaki pemula dengan trek yang tidak terlalu curam.",
        posts: [
          {
            name: "Pos 1 – Thekelan",
            elevation: 1700,
            description: "Pos pertama dengan warung dan sumber air",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 1.5,
          },
          {
            name: "Pos 2 – Pemancar",
            elevation: 2250,
            description: "Lokasi menara pemancar dengan view terbuka",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 5.0,
          },
          {
            name: "Puncak Triangulasi",
            elevation: 3145,
            description: "Puncak tertinggi Gunung Merbabu",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 10.5,
          },
        ],
      },
    ],
    tips: [
      "Bawa jaket tebal karena angin di sabana sangat kencang",
      "Jangan petik bunga edelweiss",
      "Booking online via SIMAKSI TNGGM",
      "Pendakian malam disarankan untuk menikmati sunrise",
      "Gunakan headlamp dengan baterai cadangan",
    ],
  },
  {
    id: "merapi",
    name: "Gunung Merapi",
    elevation: 2930,
    location: "Sleman – Boyolali",
    province: "DI Yogyakarta – Jawa Tengah",
    coordinates: { lat: -7.5407, lng: 110.4457 },
    description:
      "Merapi adalah gunung berapi paling aktif di Indonesia dan salah satu yang paling aktif di dunia. Dengan letusan yang terjadi secara reguler, Merapi menyimpan sejarah panjang dan budaya yang kaya bagi masyarakat Jawa. Pendakian Merapi memberikan pengalaman unik melihat aktivitas vulkanik dari dekat.",
    image:
      "https://images.unsplash.com/photo-1518070588484-2b53926cba76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHdW51bmclMjBNZXJhcGklMjBJbmRvbmVzaWElMjBlcnVwdGlvbnxlbnwxfHx8fDE3NzIyMTA5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gunung Berapi Aktif",
    status: "Waspada",
    bestSeason: "Juni – Agustus",
    permitRequired: true,
    weather: {
      temperature: 15,
      feelsLike: 11,
      humidity: 60,
      windSpeed: 20,
      condition: "Cerah",
      conditionIcon: "☀️",
      visibility: 20,
      uvIndex: 6,
      updatedAt: "27 Feb 2026, 08:00 WIB",
    },
    trails: [
      {
        id: "new-selo",
        name: "Jalur New Selo",
        difficulty: "Sulit",
        distance: 9.0,
        estimatedTime: "5-7 jam",
        startPoint: "New Selo (1630 mdpl)",
        description:
          "Jalur resmi pendakian Merapi yang dibuka kembali setelah renovasi pasca erupsi 2010.",
        posts: [
          {
            name: "Basecamp New Selo",
            elevation: 1630,
            description: "Basecamp dengan fasilitas lengkap",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 0,
          },
          {
            name: "Pos 1 – Pasang",
            elevation: 2000,
            description: "Area hutan dengan vegetasi khas Merapi",
            hasWater: true,
            hasShelter: false,
            distanceFromStart: 2.5,
          },
          {
            name: "Pos 2 – Pasar Bubar",
            elevation: 2650,
            description: "Area terbuka dekat kawasan berbahaya",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 6.0,
          },
          {
            name: "Puncak Garuda",
            elevation: 2930,
            description: "Puncak Merapi dengan kawah aktif",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 9.0,
          },
        ],
      },
    ],
    tips: [
      "Selalu pantau status aktivitas Merapi via BPPTKG",
      "Dilarang mendekati kawah kurang dari 3 km saat waspada",
      "Bawa masker gas N95",
      "Pendakian ditutup saat status lebih dari Level II",
      "Ikuti instruksi ranger dan jangan melewati batas aman",
    ],
  },
  {
    id: "papandayan",
    name: "Gunung Papandayan",
    elevation: 2665,
    location: "Garut",
    province: "Jawa Barat",
    coordinates: { lat: -7.3204, lng: 107.7316 },
    description:
      "Papandayan adalah gunung berapi di Garut, Jawa Barat yang terkenal dengan kawah aktifnya yang mengeluarkan asap belerang, hutan mati yang unik, dan padang edelweiss yang luas. Gunung ini sangat populer di kalangan pendaki pemula karena jalurnya yang relatif mudah dengan pemandangan yang menakjubkan.",
    image:
      "https://images.unsplash.com/photo-1688892561884-fb6f8a50b46c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRvbmVzaWElMjBtb3VudGFpbiUyMGhpa2luZyUyMHN1bnJpc2V8ZW58MXx8fHwxNzcyMjEwOTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Gunung Berapi",
    status: "Buka",
    bestSeason: "April – November",
    permitRequired: false,
    weather: {
      temperature: 18,
      feelsLike: 14,
      humidity: 55,
      windSpeed: 10,
      condition: "Cerah Berawan",
      conditionIcon: "⛅",
      visibility: 18,
      uvIndex: 5,
      updatedAt: "27 Feb 2026, 08:00 WIB",
    },
    trails: [
      {
        id: "camp-david",
        name: "Jalur Camp David",
        difficulty: "Mudah",
        distance: 8.0,
        estimatedTime: "5-6 jam",
        startPoint: "Kawah Papandayan (2003 mdpl)",
        description:
          "Jalur terpopuler melewati kawah aktif, hutan mati ikonik, dan padang edelweiss Tegal Alun.",
        posts: [
          {
            name: "Parkiran Kawah",
            elevation: 2003,
            description: "Pintu masuk dengan area parkir luas",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 0,
          },
          {
            name: "Kawah Papandayan",
            elevation: 2100,
            description: "Kawah aktif dengan asap belerang yang dramatis",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 1.5,
          },
          {
            name: "Hutan Mati",
            elevation: 2350,
            description: "Pohon-pohon hangus bekas erupsi yang ikonik",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 4.0,
          },
          {
            name: "Ghober Hodas",
            elevation: 2450,
            description: "Area camping dengan view cantik",
            hasWater: true,
            hasShelter: true,
            distanceFromStart: 5.5,
          },
          {
            name: "Tegal Alun",
            elevation: 2665,
            description: "Padang edelweiss terluas di Jawa Barat",
            hasWater: false,
            hasShelter: false,
            distanceFromStart: 8.0,
          },
        ],
      },
    ],
    tips: [
      "Gunakan masker di area kawah belerang",
      "Cocok untuk pendaki pemula dan keluarga",
      "Selalu bawa raincoat karena cuaca berubah cepat",
      "Jangan petik atau merusak bunga edelweiss",
      "Tersedia jasa guide lokal yang terpercaya",
    ],
  },
];
