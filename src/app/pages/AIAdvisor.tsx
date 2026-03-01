import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Mountain,
  Thermometer,
  Wind,
  Droplets,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Sparkles,
  Heart,
  Shirt,
  Shield,
  RefreshCw,
  Info,
  Star,
} from "lucide-react";
import { mountains } from "../data/mountains";

type HealthCondition =
  | "none"
  | "cold_allergy"
  | "heat_allergy"
  | "asthma"
  | "heart"
  | "hypertension"
  | "vertigo";

interface AIResult {
  status: "aman" | "waspada" | "tidak_aman";
  safetyScore: number;
  summary: string;
  clothing: string[];
  warnings: string[];
  recommendations: string[];
  bestTime: string;
}

const healthOptions: {
  value: HealthCondition;
  label: string;
  emoji: string;
}[] = [
  { value: "none", label: "Tidak Ada", emoji: "✅" },
  { value: "cold_allergy", label: "Alergi Dingin", emoji: "🥶" },
  { value: "heat_allergy", label: "Alergi Panas", emoji: "🥵" },
  { value: "asthma", label: "Asma", emoji: "😮‍💨" },
  { value: "heart", label: "Riwayat Jantung", emoji: "❤️‍🩹" },
  { value: "hypertension", label: "Hipertensi", emoji: "🩺" },
  { value: "vertigo", label: "Vertigo", emoji: "😵" },
];

function runAIAdvisor(
  mountainId: string,
  health: HealthCondition,
  experience: string
): AIResult {
  const mountain = mountains.find((m) => m.id === mountainId)!;
  const { temperature, windSpeed, humidity, condition } = mountain.weather;
  const elevation = mountain.elevation;

  let safetyScore = 100;
  const warnings: string[] = [];
  const clothing: string[] = [];
  const recommendations: string[] = [];

  // --- Temperature analysis ---
  if (temperature <= 5) {
    safetyScore -= 15;
    clothing.push("Thermal inner layer (base layer)");
    clothing.push("Fleece mid-layer");
    clothing.push("Jaket gunung windproof & waterproof");
    clothing.push("Sarung tangan tebal");
    clothing.push("Beanie / topi rajut");
    clothing.push("Celana hiking tebal");
    clothing.push("Kaus kaki wool");
    warnings.push("⚠️ Suhu ekstrem! Risiko hipotermia sangat tinggi.");
  } else if (temperature <= 10) {
    safetyScore -= 8;
    clothing.push("Thermal inner layer");
    clothing.push("Jaket gunung tebal");
    clothing.push("Sarung tangan");
    clothing.push("Beanie / buff");
    clothing.push("Celana hiking tebal");
    clothing.push("Kaus kaki hiking");
    warnings.push("⚠️ Suhu sangat dingin, siapkan lapisan pakaian yang cukup.");
  } else if (temperature <= 15) {
    clothing.push("Kaos teknis moisture-wicking");
    clothing.push("Jaket gunung ringan");
    clothing.push("Buff/balaclava");
    clothing.push("Gloves tipis");
    clothing.push("Celana hiking");
    clothing.push("Kaus kaki hiking");
  } else {
    clothing.push("Kaos teknis moisture-wicking");
    clothing.push("Jaket angin ringan");
    clothing.push("Celana hiking");
    clothing.push("Kaus kaki hiking");
    if (condition.includes("Cerah")) {
      clothing.push("Topi / sun hat");
      clothing.push("Sunscreen SPF 50+");
    }
  }

  // --- Condition analysis ---
  if (condition.includes("Hujan")) {
    safetyScore -= 20;
    clothing.push("Rain poncho / jas hujan");
    clothing.push("Rain cover carrier");
    warnings.push(
      "🌧️ Cuaca hujan - jalur bisa sangat licin, ekstra hati-hati."
    );
    recommendations.push("Pertimbangkan menunda pendakian jika hujan deras.");
  }
  if (condition.includes("Berkabut")) {
    safetyScore -= 10;
    warnings.push(
      "🌫️ Kabut tebal dapat mengurangi visibilitas secara drastis."
    );
    recommendations.push("Gunakan GPS dan tandai waypoint secara rutin.");
  }

  // --- Wind analysis ---
  if (windSpeed > 30) {
    safetyScore -= 20;
    warnings.push(
      "💨 Angin kencang! Risiko tergelincir dan hipotermia meningkat."
    );
    recommendations.push(
      "Hindari area terbuka dan tepi tebing saat angin kencang."
    );
  } else if (windSpeed > 20) {
    safetyScore -= 10;
    warnings.push("💨 Angin cukup kencang, waspadai saat di area terbuka.");
  }

  // --- Elevation risk ---
  if (elevation >= 3500) {
    safetyScore -= 10;
    warnings.push(
      "🏔️ Ketinggian ekstrem (>3500 mdpl) - risiko altitude sickness (AMS)."
    );
    recommendations.push(
      "Aklimatisasi 1-2 hari di ketinggian menengah sebelum summit."
    );
    recommendations.push(
      "Naik perlahan, jangan lebih dari 300-500m per hari di atas 2500m."
    );
  } else if (elevation >= 2500) {
    safetyScore -= 5;
    warnings.push(
      "🏔️ Ketinggian tinggi - waspadai gejala AMS (sakit kepala, mual, pusing)."
    );
    recommendations.push(
      "Minum air lebih banyak dari biasanya untuk mencegah AMS."
    );
  }

  // --- Health condition analysis ---
  if (health === "cold_allergy") {
    safetyScore -= 30;
    warnings.push(
      "🥶 PERINGATAN: Anda memiliki alergi dingin! Suhu di gunung ini sangat berisiko."
    );
    warnings.push(
      "Konsultasikan dengan dokter sebelum mendaki di kondisi ini."
    );
    recommendations.push(
      "Bawa antihistamin dan obat alergi yang diresepkan dokter."
    );
    recommendations.push(
      "Pertimbangkan memilih gunung dengan ketinggian lebih rendah."
    );
    if (temperature <= 10) {
      safetyScore -= 25;
      warnings.push(
        "❌ TIDAK DISARANKAN: Kombinasi alergi dingin dengan suhu ekstrem sangat berbahaya."
      );
    }
  }

  if (health === "heat_allergy") {
    if (temperature >= 20) {
      safetyScore -= 25;
      warnings.push(
        "🥵 PERINGATAN: Suhu yang relatif hangat berpotensi memicu alergi panas Anda."
      );
    }
    recommendations.push("Bawa cooling towel dan minum banyak air.");
    clothing.push(
      "Pakaian breathable berbahan ringan (hindari polyester tebal)"
    );
  }

  if (health === "asthma") {
    safetyScore -= 20;
    warnings.push(
      "😮‍💨 PERINGATAN: Penderita asma harus sangat berhati-hati di ketinggian tinggi."
    );
    warnings.push("Udara tipis dapat memperburuk kondisi asma.");
    recommendations.push("Bawa inhaler rescue dan pastikan terisi penuh.");
    recommendations.push(
      "Hindari pendakian di kondisi cuaca dingin dan berangin."
    );
    if (mountain.id === "merapi" || mountain.id === "semeru") {
      warnings.push(
        "⚠️ Gas vulkanik di gunung ini sangat berbahaya bagi penderita asma."
      );
      safetyScore -= 15;
    }
  }

  if (health === "heart") {
    safetyScore -= 35;
    warnings.push(
      "❤️‍🩹 PERINGATAN SERIUS: Riwayat jantung meningkatkan risiko pendakian drastis."
    );
    warnings.push(
      "Konsultasi WAJIB dengan dokter spesialis jantung sebelum mendaki."
    );
    recommendations.push(
      "Jangan mendaki sendirian, selalu ada teman yang mengetahui kondisi Anda."
    );
    recommendations.push("Bawa obat jantung dan EpiPen jika diresepkan.");
    if (elevation >= 3000) {
      safetyScore -= 20;
      warnings.push(
        "❌ SANGAT TIDAK DISARANKAN: Ketinggian >3000 mdpl dengan riwayat jantung sangat berbahaya."
      );
    }
  }

  if (health === "hypertension") {
    safetyScore -= 20;
    warnings.push(
      "🩺 PERINGATAN: Hipertensi dapat memburuk di ketinggian tinggi."
    );
    recommendations.push(
      "Monitor tekanan darah secara rutin selama pendakian."
    );
    recommendations.push("Bawa obat antihipertensi dan jangan lewatkan dosis.");
    recommendations.push("Turun segera jika tekanan darah tidak terkontrol.");
  }

  if (health === "vertigo") {
    safetyScore -= 15;
    warnings.push(
      "😵 PERINGATAN: Vertigo dapat kambuh di jalur sempit dan tepi tebing."
    );
    recommendations.push("Hindari memandang ke bawah di area curam.");
    recommendations.push("Gunakan trekking pole untuk stabilitas ekstra.");
  }

  // --- Experience level ---
  if (experience === "pemula") {
    if (elevation >= 3500) {
      safetyScore -= 20;
      warnings.push(
        "🔰 Gunung ini TIDAK direkomendasikan untuk pendaki pemula."
      );
    } else if (elevation >= 3000) {
      safetyScore -= 10;
      warnings.push(
        "🔰 Pendaki pemula disarankan melakukan beberapa pendakian gunung rendah terlebih dahulu."
      );
    }
    recommendations.push(
      "Bergabunglah dengan komunitas pendaki atau sewa guide lokal berpengalaman."
    );
    recommendations.push(
      "Lakukan latihan fisik rutin minimal 2 bulan sebelum pendakian."
    );
  }

  // --- Mountain status ---
  if (mountain.status === "Waspada") {
    safetyScore -= 25;
    warnings.push(
      "⚠️ Status gunung: WASPADA - ikuti semua instruksi resmi dari pengelola."
    );
    recommendations.push("Pantau terus informasi terbaru dari BPPTKG / BNPB.");
  } else if (mountain.status === "Tutup") {
    safetyScore = 0;
    warnings.push("🚫 JALUR DITUTUP - Pendakian dilarang keras!");
  }

  // --- General recommendations ---
  recommendations.push(
    "Daftarkan diri di pos registrasi dan tinggalkan kontak darurat."
  );
  recommendations.push("Bawa minimal 3 liter air per orang per hari.");
  recommendations.push(
    "Persiapkan fisik dengan jogging dan latihan beban 2-3 bulan sebelum pendakian."
  );

  // Clamp score
  safetyScore = Math.max(0, Math.min(100, safetyScore));

  // Determine status
  let status: "aman" | "waspada" | "tidak_aman";
  let summary: string;
  let bestTime: string;

  if (safetyScore >= 70) {
    status = "aman";
    summary = `Kondisi pendakian ke ${mountain.name} relatif AMAN. Namun tetap persiapkan diri dengan baik dan ikuti semua rekomendasi keselamatan.`;
    bestTime =
      "Waktu terbaik: Mulai pendakian pukul 00:00 - 02:00 untuk summit attack";
  } else if (safetyScore >= 40) {
    status = "waspada";
    summary = `Pendakian ke ${mountain.name} memerlukan KEWASPADAAN EKSTRA. Perhatikan semua peringatan dan pertimbangkan kondisi secara matang.`;
    bestTime =
      "Pertimbangkan kembali waktu pendakian atau pilih kondisi cuaca yang lebih baik.";
  } else {
    status = "tidak_aman";
    summary = `Saat ini TIDAK DISARANKAN mendaki ${mountain.name} berdasarkan kondisi Anda dan cuaca terkini. Keselamatan Anda adalah prioritas utama.`;
    bestTime = "Tunda pendakian hingga kondisi lebih aman.";
  }

  return {
    status,
    safetyScore,
    summary,
    clothing,
    warnings,
    recommendations,
    bestTime,
  };
}

export default function AIAdvisor() {
  const [searchParams] = useSearchParams();
  const preselectedMountain = searchParams.get("gunung") || "";

  const [selectedMountain, setSelectedMountain] = useState(preselectedMountain);
  const [selectedHealth, setSelectedHealth] = useState<HealthCondition>("none");
  const [experience, setExperience] = useState("menengah");
  const [result, setResult] = useState<AIResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (preselectedMountain) {
      setSelectedMountain(preselectedMountain);
    }
  }, [preselectedMountain]);

  const handleAnalyze = async () => {
    if (!selectedMountain) return;
    setAnalyzing(true);
    setResult(null);

    // Simulate AI processing time
    await new Promise((r) => setTimeout(r, 2000));

    const res = runAIAdvisor(selectedMountain, selectedHealth, experience);
    setResult(res);
    setAnalyzing(false);
    setStep(3);
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    setSelectedMountain(preselectedMountain);
    setSelectedHealth("none");
    setExperience("menengah");
  };

  const selectedMountainData = mountains.find((m) => m.id === selectedMountain);

  const getStatusConfig = (status: string) => {
    if (status === "aman")
      return {
        icon: CheckCircle,
        color: "text-orange-400",
        bg: "bg-orange-400/10 border-orange-400/30",
        gradient: "from-orange-600/20 to-orange-600/20",
        border: "border-orange-500/30",
        label: "AMAN UNTUK MENDAKI",
      };
    if (status === "waspada")
      return {
        icon: AlertTriangle,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10 border-yellow-400/30",
        gradient: "from-yellow-600/10 to-orange-600/10",
        border: "border-yellow-500/30",
        label: "PERLU KEWASPADAAN",
      };
    return {
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-400/10 border-red-400/30",
      gradient: "from-red-600/10 to-rose-600/10",
      border: "border-red-500/30",
      label: "TIDAK DISARANKAN",
    };
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm mb-6">
            <Brain className="w-4 h-4" />
            Powered by AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
              Advisor
            </span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Dapatkan rekomendasi pendakian personal berdasarkan kondisi cuaca
            real-time dan kondisi kesehatan Anda.
          </p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Step 1: Pilih Gunung */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs text-purple-400">
                  1
                </span>
                Pilih Gunung Tujuan
              </h2>
              <p className="text-white/40 text-xs mb-4 ml-8">
                Pilih gunung yang ingin Anda daki
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mountains.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMountain(m.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      selectedMountain === m.id
                        ? "bg-purple-500/20 border-purple-500/40 text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{m.name}</p>
                      <p className="text-xs text-white/40 truncate">
                        {m.elevation.toLocaleString()} mdpl ·{" "}
                        {m.weather.conditionIcon} {m.weather.temperature}°C
                      </p>
                    </div>
                    {selectedMountain === m.id && (
                      <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Current weather preview */}
            {selectedMountainData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Thermometer className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">
                    Kondisi Cuaca Saat Ini – {selectedMountainData.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-2xl mb-1">
                      {selectedMountainData.weather.conditionIcon}
                    </p>
                    <p className="text-white">
                      {selectedMountainData.weather.temperature}°C
                    </p>
                    <p className="text-white/40 text-xs">
                      {selectedMountainData.weather.condition}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Wind className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-white">
                      {selectedMountainData.weather.windSpeed} km/h
                    </p>
                    <p className="text-white/40 text-xs">Angin</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Droplets className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <p className="text-white">
                      {selectedMountainData.weather.humidity}%
                    </p>
                    <p className="text-white/40 text-xs">Kelembaban</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <Mountain className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                    <p className="text-white">
                      {selectedMountainData.elevation.toLocaleString()}
                    </p>
                    <p className="text-white/40 text-xs">mdpl</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Kondisi Kesehatan */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs text-purple-400">
                  2
                </span>
                Kondisi Kesehatan
              </h2>
              <p className="text-white/40 text-xs mb-4 ml-8">
                Pilih kondisi kesehatan yang relevan
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {healthOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedHealth(opt.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      selectedHealth === opt.value
                        ? "bg-purple-500/20 border-purple-500/40 text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-xs text-center">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pengalaman */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs text-purple-400">
                  3
                </span>
                Tingkat Pengalaman
              </h2>
              <p className="text-white/40 text-xs mb-4 ml-8">
                Berapa lama Anda sudah mendaki?
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: "pemula",
                    label: "Pemula",
                    desc: "< 1 tahun",
                    emoji: "🔰",
                  },
                  {
                    value: "menengah",
                    label: "Menengah",
                    desc: "1-3 tahun",
                    emoji: "⛰️",
                  },
                  {
                    value: "berpengalaman",
                    label: "Berpengalaman",
                    desc: "> 3 tahun",
                    emoji: "🏆",
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setExperience(opt.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      experience === opt.value
                        ? "bg-purple-500/20 border-purple-500/40 text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm">{opt.label}</span>
                    <span className="text-xs text-white/40">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!selectedMountain || analyzing}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:scale-[1.01] shadow-xl shadow-purple-500/20"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  AI Menganalisis...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analisis dengan AI
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>

            {!selectedMountain && (
              <p className="text-center text-white/40 text-xs">
                * Pilih gunung tujuan terlebih dahulu
              </p>
            )}
          </motion.div>
        ) : (
          /* RESULT */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Status Card */}
              {(() => {
                const cfg = getStatusConfig(result.status);
                const StatusIcon = cfg.icon;
                return (
                  <div
                    className={`rounded-2xl p-8 bg-gradient-to-br ${cfg.gradient} border ${cfg.border} text-center`}
                  >
                    <StatusIcon
                      className={`w-16 h-16 mx-auto mb-4 ${cfg.color}`}
                    />
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${cfg.bg} ${cfg.color} text-sm mb-4`}
                    >
                      {cfg.label}
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div>
                        <p className="text-white/50 text-xs">Skor Keamanan</p>
                        <div className="flex items-end gap-1">
                          <span className={`text-5xl font-black ${cfg.color}`}>
                            {result.safetyScore}
                          </span>
                          <span className="text-white/40 text-lg mb-1">
                            /100
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Score bar */}
                    <div className="w-full max-w-xs mx-auto h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                      <div
                        className={`h-full rounded-full ${
                          result.safetyScore >= 70
                            ? "bg-orange-500"
                            : result.safetyScore >= 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${result.safetyScore}%` }}
                      />
                    </div>
                    <p className="text-white/70 max-w-md mx-auto text-sm leading-relaxed">
                      {result.summary}
                    </p>
                    <p className="text-white/40 text-xs mt-3">
                      {result.bestTime}
                    </p>
                  </div>
                );
              })()}

              {/* Mountain & Health Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/40 text-xs mb-2">Gunung Tujuan</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={selectedMountainData!.image}
                        alt={selectedMountainData!.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white">{selectedMountainData!.name}</p>
                      <p className="text-white/40 text-xs">
                        {selectedMountainData!.weather.conditionIcon}{" "}
                        {selectedMountainData!.weather.temperature}°C ·{" "}
                        {selectedMountainData!.weather.condition}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/40 text-xs mb-2">Profil Pendaki</p>
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 text-purple-400 shrink-0" />
                    <div>
                      <p className="text-white">
                        {
                          healthOptions.find((h) => h.value === selectedHealth)
                            ?.emoji
                        }{" "}
                        {
                          healthOptions.find((h) => h.value === selectedHealth)
                            ?.label
                        }
                      </p>
                      <p className="text-white/40 text-xs capitalize">
                        Pengalaman: {experience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Peringatan AI ({result.warnings.length})
                  </h3>
                  <ul className="space-y-2">
                    {result.warnings.map((w, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-red-300/80"
                      >
                        <span className="text-red-400 shrink-0 mt-0.5">•</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clothing Recommendations */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-blue-400" />
                  Rekomendasi Pakaian & Perlengkapan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.clothing.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/70 bg-white/5 rounded-xl px-3 py-2 border border-white/5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  Rekomendasi Keselamatan AI
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs text-orange-400 shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-yellow-300/60 text-xs leading-relaxed">
                  Rekomendasi ini dibuat berdasarkan data cuaca dan kondisi yang
                  tersedia. Selalu konsultasikan dengan dokter untuk kondisi
                  medis serius, dan ikuti instruksi resmi dari pengelola kawasan
                  taman nasional. Keputusan final ada di tangan Anda.
                </p>
              </div>

              {/* Reset Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Analisis Ulang
                </button>
                <a
                  href={`/gunung/${selectedMountain}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90 transition-all"
                >
                  <Mountain className="w-4 h-4" />
                  Lihat Detail Gunung
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
