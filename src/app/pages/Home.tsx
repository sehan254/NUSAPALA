import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Mountain,
  Brain,
  Navigation,
  Wind,
  Thermometer,
  Droplets,
  ArrowRight,
  Star,
  Users,
  Shield,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { mountains } from "../data/mountains";

const stats = [
  { label: "Gunung Terdaftar", value: "120+", icon: Mountain },
  { label: "Pendaki Terbantu", value: "25.000+", icon: Users },
  { label: "Keselamatan", value: "99.8%", icon: Shield },
  { label: "Rating Platform", value: "4.9 ⭐", icon: Star },
];

const features = [
  {
    icon: Brain,
    title: "AI Advisor",
    description:
      "Rekomendasi pendakian cerdas berbasis kondisi cuaca, kesehatan, dan preferensi Anda secara personal.",
    color: "from-purple-500 to-violet-600",
    link: "/ai-advisor",
  },
  {
    icon: Navigation,
    title: "GPS Tracking",
    description:
      "Lacak posisi Anda secara real-time di peta. Monitor pergerakan dan koordinat lokasi saat mendaki.",
    color: "from-blue-500 to-cyan-600",
    link: "/gps-tracking",
  },
  {
    icon: Mountain,
    title: "Info Gunung Lengkap",
    description:
      "Data lengkap jalur pendakian, pos-pos, elevasi, fasilitas air dan shelter di setiap gunung.",
    color: "from-orange-500 to-orange-600",
    link: "/gunung",
  },
  {
    icon: Thermometer,
    title: "Cuaca Real-Time",
    description:
      "Data suhu, kelembaban, kecepatan angin, dan kondisi cuaca terkini langsung dari gunung tujuan.",
    color: "from-orange-500 to-red-600",
    link: "/gunung",
  },
];

export default function Home() {
  const featuredMountains = mountains.slice(0, 3);

  const getStatusColor = (status: string) => {
    if (status === "Buka")
      return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    if (status === "Waspada")
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Buka") return <CheckCircle className="w-3 h-3" />;
    if (status === "Waspada") return <AlertTriangle className="w-3 h-3" />;
    return <AlertTriangle className="w-3 h-3" />;
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={mountains[5].image}
            alt="Hero"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/40 to-[#0a1628]" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm mb-8">
              <TrendingUp className="w-4 h-4" />
              Platform Edukasi Pendakian #1 Indonesia
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Pendakian Lebih{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
                Aman
              </span>
              <br />
              Dengan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
                NUSAPALA
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Platform cerdas berbasis AI yang mengintegrasikan informasi cuaca
              real-time, GPS tracking, dan rekomendasi pendakian personal untuk
              keselamatan Anda di gunung-gunung Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/gunung"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white hover:opacity-90 transition-all shadow-lg shadow-orange-500/25 hover:scale-105"
              >
                <Mountain className="w-5 h-5" />
                Jelajahi Gunung
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ai-advisor"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all"
              >
                <Brain className="w-5 h-5" />
                Coba AI Advisor
              </Link>
            </div>
          </motion.div>

          {/* Weather ticker cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {featuredMountains.map((m) => (
              <Link
                key={m.id}
                to={`/gunung/${m.id}`}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-orange-500/30 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-white/50 uppercase tracking-wider">
                    {m.name}
                  </p>
                  <span className="text-lg">{m.weather.conditionIcon}</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-white">
                    {m.weather.temperature}°
                  </span>
                  <span className="text-white/50 text-sm mb-1">C</span>
                </div>
                <p className="text-xs text-white/40 mt-1">
                  {m.weather.condition}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" /> {m.weather.humidity}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="w-3 h-3" /> {m.weather.windSpeed} km/h
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 flex justify-center"
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-orange-400" />
                </div>
                <p className="text-3xl font-black text-white mb-1">{s.value}</p>
                <p className="text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Fitur{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
              Unggulan
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Teknologi canggih dalam genggaman Anda untuk mendaki lebih cerdas
            dan lebih aman
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={f.link}
                className="block h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {f.description}
                </p>
                <div className="flex items-center gap-1 mt-4 text-orange-400 text-sm">
                  Selengkapnya <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Mountains */}
      <section className="py-20 bg-white/[0.02] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2">
                Gunung{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
                  Populer
                </span>
              </h2>
              <p className="text-white/50">
                Destinasi pendakian terfavorit di Indonesia
              </p>
            </div>
            <Link
              to="/gunung"
              className="flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-xl text-white/70 hover:text-white hover:border-white/40 transition-all text-sm"
            >
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mountains.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/gunung/${m.id}`}
                  className="block rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs ${getStatusColor(m.status)} backdrop-blur-sm">
                      <span
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs backdrop-blur-sm ${getStatusColor(
                          m.status
                        )}`}
                      >
                        {getStatusIcon(m.status)} {m.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                        {m.category}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-white">{m.name}</h3>
                        <p className="text-white/50 text-xs mt-0.5">
                          {m.province}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-orange-400 text-sm">
                          {m.elevation.toLocaleString()} mdpl
                        </p>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">
                      {m.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/40 pt-3 border-t border-white/10">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-orange-400" />
                        {m.weather.temperature}°C
                      </span>
                      <span className="flex items-center gap-1">
                        <Wind className="w-3 h-3 text-blue-400" />
                        {m.weather.windSpeed} km/h
                      </span>
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-cyan-400" />
                        {m.weather.humidity}%
                      </span>
                      <span className="ml-auto text-orange-400/80">
                        {m.weather.conditionIcon} {m.weather.condition}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600/20 to-orange-600/20 border border-orange-500/30 p-8 sm:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-500/5" />
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Utamakan Keselamatan, Bukan Puncak
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
              Gunakan AI Advisor NUSAPALA untuk mendapatkan rekomendasi personal
              sebelum mendaki. Keselamatan Anda adalah prioritas utama kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-advisor"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white hover:opacity-90 transition-all shadow-lg shadow-orange-500/25"
              >
                <Brain className="w-5 h-5" />
                Mulai AI Advisor Sekarang
              </Link>
              <Link
                to="/gps-tracking"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 transition-all"
              >
                <Navigation className="w-5 h-5" />
                GPS Tracking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
