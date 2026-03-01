import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import {
  Navigation,
  MapPin,
  Crosshair,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Compass,
  Zap,
  Clock,
  Mountain,
  Signal,
  Info,
  Play,
  Square,
} from "lucide-react";

interface LocationData {
  lat: number;
  lng: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
  timestamp: number;
}

interface TrackPoint {
  lat: number;
  lng: number;
  timestamp: number;
  altitude: number | null;
}

function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const dPhi = ((lat2 - lat1) * Math.PI) / 180;
  const dLambda = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}j ${m}m ${s}d`;
  if (m > 0) return `${m}m ${s}d`;
  return `${s}d`;
}

export default function GPSTracking() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastPointRef = useRef<TrackPoint | null>(null);

  const getMapUrl = (lat: number, lng: number) =>
    `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${
      lat - 0.01
    }%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Browser Anda tidak mendukung geolocation.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
          timestamp: pos.timestamp,
        });
        setLoading(false);
      },
      (err) => {
        setError(getGeoError(err.code));
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, []);

  const getGeoError = (code: number) => {
    if (code === 1)
      return "Izin lokasi ditolak. Izinkan akses lokasi di pengaturan browser Anda.";
    if (code === 2) return "Lokasi tidak tersedia. Pastikan GPS aktif.";
    if (code === 3) return "Waktu habis saat mengambil lokasi. Coba lagi.";
    return "Gagal mendapatkan lokasi.";
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Browser Anda tidak mendukung geolocation.");
      return;
    }
    setError(null);
    setTrackPoints([]);
    setTotalDistance(0);
    setElapsedTime(0);
    setStartTime(Date.now());
    lastPointRef.current = null;
    setTracking(true);

    // Timer
    timerRef.current = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);

    // Watch position
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newPoint: TrackPoint = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: pos.timestamp,
          altitude: pos.coords.altitude,
        };

        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          speed: pos.coords.speed,
          heading: pos.coords.heading,
          timestamp: pos.timestamp,
        });

        if (lastPointRef.current) {
          const dist = getDistance(
            lastPointRef.current.lat,
            lastPointRef.current.lng,
            newPoint.lat,
            newPoint.lng
          );
          if (dist > 5) {
            // Only add if moved > 5 meters
            setTotalDistance((d) => d + dist);
            setTrackPoints((pts) => [...pts.slice(-50), newPoint]);
            lastPointRef.current = newPoint;
          }
        } else {
          lastPointRef.current = newPoint;
          setTrackPoints([newPoint]);
        }
      },
      (err) => {
        setError(getGeoError(err.code));
        stopTracking();
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 5000 }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTracking(false);
  };

  useEffect(() => {
    getLocation();
    return () => {
      stopTracking();
    };
  }, []);

  const getAccuracyLabel = (acc: number) => {
    if (acc <= 5) return { label: "Sangat Akurat", color: "text-orange-400" };
    if (acc <= 15) return { label: "Akurat", color: "text-orange-400" };
    if (acc <= 50) return { label: "Cukup Akurat", color: "text-yellow-400" };
    return { label: "Rendah", color: "text-red-400" };
  };

  const avgSpeed =
    elapsedTime > 0 ? totalDistance / 1000 / (elapsedTime / 3600) : 0;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm mb-6">
            <Navigation className="w-4 h-4" />
            Real-time GPS Tracking
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            GPS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Tracking
            </span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Lacak posisi Anda secara real-time saat mendaki. Monitor koordinat,
            ketinggian, kecepatan, dan jarak tempuh.
          </p>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-6 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 text-sm">{error}</p>
              <button
                onClick={getLocation}
                className="text-red-400 hover:text-red-300 text-xs mt-1 underline"
              >
                Coba lagi
              </button>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {loading && !location && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mb-4" />
            <p className="text-white/50">Mengambil lokasi GPS Anda...</p>
          </div>
        )}

        {location && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT: Map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">
                      Posisi Anda Saat Ini
                    </span>
                    {tracking && (
                      <span className="flex items-center gap-1 text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                  <button
                    onClick={getLocation}
                    disabled={loading || tracking}
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors disabled:opacity-30"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                    />
                    Refresh
                  </button>
                </div>
                <div className="relative h-80 sm:h-96">
                  <iframe
                    key={`${location.lat}-${location.lng}`}
                    title="GPS Map"
                    src={getMapUrl(location.lat, location.lng)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                  {/* Overlay indicator */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 bg-[#0a1628]/90 backdrop-blur-sm rounded-xl border border-white/10 text-xs">
                    <Crosshair className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-white/70">
                      {location.lat.toFixed(6)}°, {location.lng.toFixed(6)}°
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Tracking Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Rekam Jejak Pendakian
                  </h3>
                  {tracking ? (
                    <button
                      onClick={stopTracking}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-all text-sm"
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </button>
                  ) : (
                    <button
                      onClick={startTracking}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 hover:bg-orange-500/30 transition-all text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Mulai Rekam
                    </button>
                  )}
                </div>

                {/* Tracking stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-white text-sm">
                      {formatTime(elapsedTime)}
                    </p>
                    <p className="text-white/40 text-xs">Durasi</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Navigation className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <p className="text-white text-sm">
                      {totalDistance >= 1000
                        ? `${(totalDistance / 1000).toFixed(2)} km`
                        : `${Math.round(totalDistance)} m`}
                    </p>
                    <p className="text-white/40 text-xs">Jarak Tempuh</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                    <p className="text-white text-sm">
                      {location.speed !== null
                        ? `${((location.speed || 0) * 3.6).toFixed(1)} km/j`
                        : avgSpeed > 0
                        ? `${avgSpeed.toFixed(1)} km/j`
                        : "—"}
                    </p>
                    <p className="text-white/40 text-xs">Kecepatan</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Mountain className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-white text-sm">
                      {location.altitude !== null
                        ? `${Math.round(location.altitude)} m`
                        : "—"}
                    </p>
                    <p className="text-white/40 text-xs">Ketinggian</p>
                  </div>
                </div>

                {/* Track history */}
                {trackPoints.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-white/50 text-xs mb-2">
                      {trackPoints.length} titik terekam
                    </p>
                    <div className="flex gap-1 overflow-x-auto pb-1">
                      {trackPoints.slice(-20).map((pt, i) => (
                        <div
                          key={i}
                          className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
                          title={`${pt.lat.toFixed(5)}, ${pt.lng.toFixed(5)}`}
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* RIGHT: Info Panel */}
            <div className="space-y-5">
              {/* Coordinates */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-5"
              >
                <h3 className="text-white text-sm mb-4 flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-blue-400" />
                  Koordinat GPS
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/40 text-xs mb-1">Latitude</p>
                    <p className="text-white font-mono">
                      {location.lat.toFixed(6)}°
                    </p>
                    <p className="text-white/30 text-xs">
                      {location.lat >= 0 ? "Lintang Utara" : "Lintang Selatan"}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/40 text-xs mb-1">Longitude</p>
                    <p className="text-white font-mono">
                      {location.lng.toFixed(6)}°
                    </p>
                    <p className="text-white/30 text-xs">
                      {location.lng >= 0 ? "Bujur Timur" : "Bujur Barat"}
                    </p>
                  </div>
                  {location.altitude !== null && (
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/40 text-xs mb-1">
                        Ketinggian (GPS)
                      </p>
                      <p className="text-white font-mono">
                        {Math.round(location.altitude)} m dpl
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Signal Quality */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <h3 className="text-white text-sm mb-4 flex items-center gap-2">
                  <Signal className="w-4 h-4 text-orange-400" />
                  Kualitas Sinyal
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs">Akurasi</span>
                    <span
                      className={`text-xs ${
                        getAccuracyLabel(location.accuracy).color
                      }`}
                    >
                      {getAccuracyLabel(location.accuracy).label}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        location.accuracy <= 15
                          ? "bg-orange-500"
                          : location.accuracy <= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.max(
                          5,
                          Math.min(100, 100 - location.accuracy)
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">Radius akurasi</span>
                    <span className="text-white">
                      ±{Math.round(location.accuracy)} m
                    </span>
                  </div>
                </div>

                {/* Extra info */}
                <div className="mt-4 space-y-2 pt-4 border-t border-white/10">
                  {location.heading !== null && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-white/50">
                        <Compass className="w-3 h-3" /> Arah Hadap
                      </span>
                      <span className="text-white">
                        {Math.round(location.heading)}°
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Diperbarui</span>
                    <span className="text-white">
                      {new Date(location.timestamp).toLocaleTimeString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Status</span>
                    <span className="flex items-center gap-1 text-orange-400">
                      <CheckCircle className="w-3 h-3" /> Aktif
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Emergency Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5"
              >
                <h3 className="text-red-400 text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Kontak Darurat
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    { name: "Basarnas", num: "115" },
                    { name: "Ambulans", num: "119" },
                    { name: "Polisi", num: "110" },
                    { name: "BPBD", num: "021-5470005" },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex justify-between items-center"
                    >
                      <span className="text-white/50">{c.name}</span>
                      <a
                        href={`tel:${c.num}`}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        📞 {c.num}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Share Location */}
                <button
                  onClick={() => {
                    const text = `📍 Lokasi saya:\nLat: ${location.lat.toFixed(
                      6
                    )}\nLng: ${location.lng.toFixed(6)}\n${
                      location.altitude
                        ? `Ketinggian: ${Math.round(location.altitude)}m\n`
                        : ""
                    }Maps: https://maps.google.com/?q=${location.lat},${
                      location.lng
                    }`;
                    if (navigator.share) {
                      navigator.share({ title: "Lokasi GPS Saya", text });
                    } else {
                      navigator.clipboard.writeText(text);
                      alert("Koordinat disalin ke clipboard!");
                    }
                  }}
                  className="w-full mt-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-all"
                >
                  📤 Bagikan Lokasi Darurat
                </button>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <h3 className="text-white text-sm mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-yellow-400" />
                  Tips GPS Tracking
                </h3>
                <ul className="space-y-2 text-xs text-white/50">
                  <li>
                    • Aktifkan GPS di pengaturan perangkat untuk akurasi terbaik
                  </li>
                  <li>• Batasi penggunaan GPS untuk menghemat baterai</li>
                  <li>• Bagikan koordinat ke anggota tim sebelum mendaki</li>
                  <li>• Simpan screenshot koordinat sebagai backup offline</li>
                  <li>
                    • Gunakan power bank untuk menjaga perangkat tetap menyala
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        )}

        {/* No GPS support */}
        {!loading && !location && !error && (
          <div className="text-center py-20">
            <Navigation className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 mb-4">
              Klik tombol di bawah untuk mengaktifkan GPS
            </p>
            <button
              onClick={getLocation}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-white mx-auto hover:opacity-90 transition-all"
            >
              <Crosshair className="w-4 h-4" />
              Aktifkan GPS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
