import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Mountain,
  Search,
  Filter,
  Thermometer,
  Wind,
  Droplets,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { mountains } from "../data/mountains";

const difficultyOptions = ["Semua", "Mudah", "Sedang", "Sulit", "Ekstrem"];
const statusOptions = ["Semua", "Buka", "Waspada", "Tutup"];
const provinceOptions = [
  "Semua",
  "Jawa Tengah",
  "Jawa Timur",
  "Jawa Barat",
  "DI Yogyakarta – Jawa Tengah",
  "Nusa Tenggara Barat",
  "Jambi – Sumatera Barat",
];

export default function MountainList() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedProvince, setSelectedProvince] = useState("Semua");
  const [sortBy, setSortBy] = useState("name");

  const getStatusStyle = (status: string) => {
    if (status === "Buka")
      return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    if (status === "Waspada")
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Buka") return <CheckCircle className="w-3 h-3" />;
    if (status === "Waspada") return <AlertTriangle className="w-3 h-3" />;
    return <XCircle className="w-3 h-3" />;
  };

  const getDifficultyColor = (diff: string) => {
    if (diff === "Mudah") return "text-orange-400";
    if (diff === "Sedang") return "text-yellow-400";
    if (diff === "Sulit") return "text-orange-400";
    return "text-red-400";
  };

  const filtered = mountains
    .filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.province.toLowerCase().includes(search.toLowerCase()) ||
        m.location.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        selectedStatus === "Semua" || m.status === selectedStatus;
      const matchProvince =
        selectedProvince === "Semua" || m.province === selectedProvince;
      return matchSearch && matchStatus && matchProvince;
    })
    .sort((a, b) => {
      if (sortBy === "elevation") return b.elevation - a.elevation;
      if (sortBy === "temp")
        return a.weather.temperature - b.weather.temperature;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm mb-6">
            <Mountain className="w-4 h-4" />
            {mountains.length} Gunung Terdaftar
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Daftar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
              Gunung
            </span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Temukan gunung impian Anda. Cek kondisi cuaca, jalur pendakian, dan
            rekomendasi keselamatan.
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Cari nama gunung atau provinsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/30 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl text-white text-sm px-3 py-2.5 focus:outline-none focus:border-orange-500/50 transition-colors cursor-pointer"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s} className="bg-[#0a1628]">
                  {s === "Semua" ? "Status: Semua" : s}
                </option>
              ))}
            </select>
          </div>

          {/* Province Filter */}
          <div>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl text-white text-sm px-3 py-2.5 focus:outline-none focus:border-orange-500/50 transition-colors cursor-pointer w-full lg:w-auto"
            >
              <option value="Semua" className="bg-[#0a1628]">
                Provinsi: Semua
              </option>
              {provinceOptions.slice(1).map((p) => (
                <option key={p} value={p} className="bg-[#0a1628]">
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl text-white text-sm px-3 py-2.5 focus:outline-none focus:border-orange-500/50 transition-colors cursor-pointer w-full lg:w-auto"
            >
              <option value="name" className="bg-[#0a1628]">
                Urutkan: Nama
              </option>
              <option value="elevation" className="bg-[#0a1628]">
                Urutkan: Ketinggian
              </option>
              <option value="temp" className="bg-[#0a1628]">
                Urutkan: Suhu Terendah
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-white/40 text-sm">
          Menampilkan <span className="text-white">{filtered.length}</span>{" "}
          gunung
        </p>
      </div>

      {/* Mountain Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Mountain className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Gunung tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={`/gunung/${m.id}`}
                  className="block rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group h-full"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs backdrop-blur-sm ${getStatusStyle(
                          m.status
                        )}`}
                      >
                        {getStatusIcon(m.status)} {m.status}
                      </span>
                    </div>

                    {/* Elevation */}
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                        <TrendingUp className="w-3 h-3 text-orange-400" />
                        {m.elevation.toLocaleString()} mdpl
                      </span>
                    </div>

                    {/* Weather overlay */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm">
                      <span>{m.weather.conditionIcon}</span>
                      <span className="text-white text-sm">
                        {m.weather.temperature}°C
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-white mb-0.5">{m.name}</h3>
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <MapPin className="w-3 h-3" />
                        {m.location}, {m.province}
                      </div>
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">
                      {m.description}
                    </p>

                    {/* Trails info */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {m.trails.map((t) => (
                        <span
                          key={t.id}
                          className={`text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 ${getDifficultyColor(
                            t.difficulty
                          )}`}
                        >
                          {t.name.split(" ").slice(-1)[0]} – {t.difficulty}
                        </span>
                      ))}
                    </div>

                    {/* Stats Row */}
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
                      <span className="ml-auto flex items-center gap-1 text-orange-400 text-xs">
                        Detail <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
