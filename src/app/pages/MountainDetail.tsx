import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Mountain,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Sun,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Droplet,
  Home,
  ChevronRight,
  Info,
  Brain,
  Navigation,
  Star,
  Calendar,
  FileText,
  Ruler,
} from "lucide-react";
import { mountains } from "../data/mountains";

export default function MountainDetail() {
  const { id } = useParams();
  const mountain = mountains.find((m) => m.id === id);
  const [activeTrail, setActiveTrail] = useState(0);

  if (!mountain) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Mountain className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-white mb-2">Gunung tidak ditemukan</h2>
          <Link to="/gunung" className="text-orange-400 hover:text-orange-300">
            ← Kembali ke daftar gunung
          </Link>
        </div>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    if (status === "Buka")
      return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    if (status === "Waspada")
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Buka") return <CheckCircle className="w-4 h-4" />;
    if (status === "Waspada") return <AlertTriangle className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === "Mudah")
      return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    if (diff === "Sedang")
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    if (diff === "Sulit")
      return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  const trail = mountain.trails[activeTrail];
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    mountain.coordinates.lng - 0.15
  }%2C${mountain.coordinates.lat - 0.15}%2C${
    mountain.coordinates.lng + 0.15
  }%2C${mountain.coordinates.lat + 0.15}&layer=cyclemap&marker=${
    mountain.coordinates.lat
  }%2C${mountain.coordinates.lng}`;

  return (
    <div className="pt-20 pb-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={mountain.image}
          alt={mountain.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />

        {/* Back */}
        <div className="absolute top-6 left-4 sm:left-8">
          <Link
            to="/gunung"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/80 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-6 right-4 sm:right-8 flex items-center gap-1 text-xs text-white/50">
          <Home className="w-3 h-3" />
          <ChevronRight className="w-3 h-3" />
          <Link to="/gunung" className="hover:text-white transition-colors">
            Gunung
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">{mountain.name}</span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs ${getStatusStyle(
                      mountain.status
                    )}`}
                  >
                    {getStatusIcon(mountain.status)} {mountain.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs">
                    {mountain.category}
                  </span>
                  {mountain.permitRequired && (
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Izin Wajib
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  {mountain.name}
                </h1>
                <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  {mountain.location}, {mountain.province}
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/50 text-xs">Ketinggian</p>
                <p className="text-3xl font-black text-orange-400">
                  {mountain.elevation.toLocaleString()}
                  <span className="text-lg text-white/50 ml-1">mdpl</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-white mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-orange-400" />
                Tentang {mountain.name}
              </h2>
              <p className="text-white/60 leading-relaxed text-sm">
                {mountain.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-white/10">
                <div>
                  <p className="text-white/40 text-xs mb-1">Musim Terbaik</p>
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    {mountain.bestSeason}
                  </div>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Jalur Tersedia</p>
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <Navigation className="w-4 h-4 text-blue-400" />
                    {mountain.trails.length} jalur
                  </div>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Rating</p>
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <Star className="w-4 h-4 text-yellow-400" />
                    4.8 / 5.0
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trail Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-white mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-orange-400" />
                Jalur Pendakian
              </h2>

              {/* Trail tabs */}
              {mountain.trails.length > 1 && (
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                  {mountain.trails.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTrail(i)}
                      className={`shrink-0 px-4 py-2 rounded-lg text-sm transition-all ${
                        activeTrail === i
                          ? "bg-orange-500/20 border border-orange-500/40 text-orange-400"
                          : "bg-white/5 border border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Trail Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md border ${getDifficultyColor(
                      trail.difficulty
                    )}`}
                  >
                    {trail.difficulty}
                  </span>
                  <p className="text-white/40 text-xs mt-2">Kesulitan</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-white">{trail.distance} km</p>
                  <p className="text-white/40 text-xs mt-1">Total Jarak</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-white text-sm">{trail.estimatedTime}</p>
                  <p className="text-white/40 text-xs mt-1">Estimasi</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-white text-xs leading-tight">
                    {trail.startPoint.split("(")[0].trim()}
                  </p>
                  <p className="text-white/40 text-xs mt-1">Titik Start</p>
                </div>
              </div>

              <p className="text-white/50 text-sm mb-5">{trail.description}</p>

              {/* Posts Timeline */}
              <h3 className="text-white/70 text-xs uppercase tracking-wider mb-4">
                📍 Pos-Pos Pendakian
              </h3>
              <div className="space-y-0">
                {trail.posts.map((post, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 border ${
                          idx === trail.posts.length - 1
                            ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-500 text-white"
                            : "bg-white/5 border-white/20 text-white/60"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      {idx < trail.posts.length - 1 && (
                        <div className="w-px flex-1 bg-white/10 my-1 min-h-[24px]" />
                      )}
                    </div>
                    <div className="pb-5 flex-1">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h4 className="text-white text-sm">{post.name}</h4>
                        <span className="text-orange-400 text-xs bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/20">
                          {post.elevation.toLocaleString()} mdpl
                        </span>
                        {post.distanceFromStart > 0 && (
                          <span className="text-white/30 text-xs">
                            {post.distanceFromStart} km
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-xs mb-2">
                        {post.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {post.hasWater && (
                          <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md border border-blue-400/20">
                            <Droplet className="w-3 h-3" /> Air Tersedia
                          </span>
                        )}
                        {post.hasShelter && (
                          <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-md border border-orange-400/20">
                            <Home className="w-3 h-3" /> Shelter
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                Peta Lokasi Gunung
              </h2>
              <div className="rounded-xl overflow-hidden h-72 border border-white/10">
                <iframe
                  title={`Peta ${mountain.name}`}
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/40">
                <span>📍 Lat: {mountain.coordinates.lat.toFixed(4)}°</span>
                <span>Lng: {mountain.coordinates.lng.toFixed(4)}°</span>
                <span className="ml-auto">
                  {mountain.location}, {mountain.province}
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Weather Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-blue-400" />
                  Cuaca Real-Time
                </h3>
                <span className="text-3xl">
                  {mountain.weather.conditionIcon}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-white">
                    {mountain.weather.temperature}°
                  </span>
                  <div className="mb-2">
                    <p className="text-white/50 text-sm">C</p>
                    <p className="text-white/30 text-xs">
                      Terasa {mountain.weather.feelsLike}°C
                    </p>
                  </div>
                </div>
                <p className="text-blue-300 text-sm">
                  {mountain.weather.condition}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <Wind className="w-3 h-3" /> Angin
                  </div>
                  <p className="text-white text-sm">
                    {mountain.weather.windSpeed} km/h
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <Droplets className="w-3 h-3" /> Kelembaban
                  </div>
                  <p className="text-white text-sm">
                    {mountain.weather.humidity}%
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <Eye className="w-3 h-3" /> Visibilitas
                  </div>
                  <p className="text-white text-sm">
                    {mountain.weather.visibility} km
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-white/40 text-xs mb-1">
                    <Sun className="w-3 h-3" /> UV Index
                  </div>
                  <p className="text-white text-sm">
                    {mountain.weather.uvIndex}
                  </p>
                </div>
              </div>
              <p className="text-white/20 text-xs mt-4 text-center">
                Diperbarui: {mountain.weather.updatedAt}
              </p>
            </motion.div>

            {/* Safety Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white text-sm mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                Tips Keselamatan
              </h3>
              <ul className="space-y-2">
                {mountain.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-white/60"
                  >
                    <span className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs text-orange-400 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Equipment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white text-sm mb-4 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-purple-400" />
                Perlengkapan Dasar
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "🎒 Carrier 60-80L",
                  "🧥 Jaket tebal",
                  "👟 Sepatu gunung",
                  "🔦 Headlamp",
                  "💧 Botol air 3L",
                  "🍫 Makanan energi",
                  "🧤 Sarung tangan",
                  "🩹 P3K lengkap",
                ].map((item) => (
                  <span
                    key={item}
                    className="text-xs text-white/50 bg-white/5 rounded-lg px-2 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA AI Advisor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Link
                to={`/ai-advisor?gunung=${mountain.id}`}
                className="flex items-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">Cek AI Advisor</p>
                  <p className="text-purple-300/60 text-xs">
                    Rekomendasi personal untuk pendakian ini
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* CTA GPS */}
            <Link
              to="/gps-tracking"
              className="flex items-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">GPS Tracking</p>
                <p className="text-blue-300/60 text-xs">
                  Lacak posisi Anda saat mendaki
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
