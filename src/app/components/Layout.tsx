import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  Mountain,
  Map,
  Brain,
  Navigation,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";

const navLinks = [
  { to: "/", label: "Beranda", icon: Home },
  { to: "/gunung", label: "Daftar Gunung", icon: Mountain },
  { to: "/ai-advisor", label: "AI Advisor", icon: Brain },
  { to: "/gps-tracking", label: "GPS Tracking", icon: Navigation },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a1628]/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div>
                <span className="text-xl font-black tracking-wider text-white">
                  NUSA<span className="text-orange-400">PALA</span>
                </span>
                <p className="text-[10px] text-white/50 leading-none tracking-widest uppercase">
                  Pendakian Aman & Terinformasi
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive(to)
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link
              to="/ai-advisor"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-sm text-white hover:opacity-90 transition-opacity shadow-lg"
            >
              <Brain className="w-4 h-4" />
              Cek AI Advisor
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0a1628]/98 backdrop-blur-md border-t border-white/10">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive(to)
                      ? "bg-orange-500/20 text-orange-400"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#060d1a] border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-black">
                  NUSA<span className="text-orange-400">PALA</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Platform edukasi pendakian gunung berbasis AI yang menyediakan
                informasi cuaca real-time, GPS tracking, dan rekomendasi
                pendakian yang aman. 
                Dibuat oleh Sehan Zaki Seorang mahasiswa Teknik Informatika yang kebetulan adalah anggota Nusa Putra Pecinta Alam (NUSAPALA), Nama yang sama dengan website ini. Membuktikan bahwa Mapala tidak mendisoerintasikan Anggotanya untuk bisa berkarya sesuai dengan jurusan perkuliahannya.
              </p>
            </div>
            <div>
              <h4 className="text-sm text-white/70 mb-4 uppercase tracking-widest">
                Navigasi
              </h4>
              <ul className="space-y-2">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-white/50 hover:text-orange-400 text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm text-white/70 mb-4 uppercase tracking-widest">
                Keselamatan
              </h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li>📞 Basarnas: 115</li>
                <li>🚑 Darurat: 119</li>
                <li>🔥 Damkar: 113</li>
                <li>⚠️ BPBD: 021-5470005</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">
              © 2026 NUSAPALA. Website Edukasi Pendakian Gunung Indonesia.
            </p>
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-orange-400" />
              <span className="text-white/30 text-xs">
                Dibuat untuk keselamatan pendaki Indonesia
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
