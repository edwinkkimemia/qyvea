"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart, Heart, Menu, X, Phone, Search, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE, SERVICES } from "@/lib/constants";
import { useStore } from "@/lib/store";

const MOBILE_SECTIONS = [
  { key: "security", label: "Security", color: "#0038A0", filter: "Security" },
  { key: "power", label: "Power & Solar", color: "#0064D8", filter: "Power & Solar" },
  { key: "it", label: "IT & Networking", color: "#F00000", filter: "IT & Networking" },
  { key: "digital", label: "Digital & Creative", color: "#0038A0", filter: "Digital & Creative" },
  { key: "ict", label: "ICT Products", color: "#F00000", filter: null },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);



  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const toggleSection = (key: string) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
      {/* Top bar — Get Quote + Sign In red buttons, font size returned to previous (12px) */}
      <div className="bg-[#002070] text-white text-[12px] border-b-2 border-[#F00000]">
        <div className="container mx-auto flex h-7 items-center justify-between px-4 gap-2">
          <div className="hidden lg:flex gap-3 overflow-hidden whitespace-nowrap">
            <span>CCTV Installation • Biometric Access • Solar • Electric Fencing • IT Support • Automatic Gates • Fire Alarm • Electrical • Smart Home • 24/7 Emergency</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link href={`tel:${SITE.phone}`} className="hidden sm:flex items-center gap-1 hover:text-white/80 transition whitespace-nowrap"><Phone className="h-3 w-3" />{SITE.phone}</Link>
            <Link href={`https://wa.me/${SITE.whatsapp}`} target="_blank" className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-2.5 py-1 rounded-full font-bold text-[12px] transition hidden md:flex items-center gap-1">
              <svg viewBox="0 0 32 32" className="h-3 w-3 fill-white"><path d="M16.04 2C8.43 2 2.22 8.21 2.22 15.83c0 2.44.64 4.81 1.85 6.9L2.08 30l7.48-1.97a13.76 13.76 0 0 0 6.48 1.64h.01c7.61 0 13.82-6.21 13.82-13.83 0-3.7-1.44-7.17-4.05-9.78A13.75 13.75 0 0 0 16.04 2Zm7.93 19.8c-.33.95-1.95 1.84-2.71 1.96-.68.1-1.36.1-2.2-.1-.58-.14-1.33-.33-2.28-.65-4.02-1.72-6.64-5.74-6.84-6-.2-.27-1.66-2.21-1.66-4.22s1.05-3 1.43-3.41c.33-.36.87-.52 1.39-.52h1c.37 0 .69.02.99.83.33.95 1.14 3.28 1.24 3.52.1.24.16.52.02.83-.14.31-.21.5-.42.77-.2.27-.43.57-.61.77-.2.22-.41.46-.18.9.23.44 1.04 1.72 2.23 2.79 1.53 1.36 2.82 1.78 3.22 1.98.31.15.5.13.68-.08.19-.2.79-.92 1-1.22.21-.31.42-.26.71-.16.29.1 1.83.87 2.15 1.02.31.16.52.24.6.37.08.13.08.76-.25 1.71Z"/></svg>
              WhatsApp
            </Link>
            <Link href="/quote" className="bg-[#F00000] hover:bg-[#CC0000] text-white px-3 py-1 rounded-full font-bold text-[12px] transition whitespace-nowrap">Get Quote</Link>
            {session?.user ? (
              <Link href="/dashboard" className="bg-[#F00000] hover:bg-[#CC0000] text-white px-3 py-1 rounded-full font-bold text-[12px] transition whitespace-nowrap hidden sm:inline-flex items-center gap-1">
                <User className="h-3 w-3" /> Dashboard
              </Link>
            ) : (
              <Link href="/login" className="bg-[#F00000] hover:bg-[#CC0000] text-white px-3 py-1 rounded-full font-bold text-[12px] transition whitespace-nowrap">Sign In</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/syntechlogo.jpg" alt="Syntech Solutions" className="h-10 md:h-12 w-auto max-w-[160px] object-contain rounded-md" loading="eager" />
            </Link>

            {/* Desktop nav links — text color only, no bg */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {[
                { label: "Security", filter: "Security" },
                { label: "Power & Solar", filter: "Power & Solar" },
                { label: "IT & Networking", filter: "IT & Networking" },
                { label: "Digital & Creative", filter: "Digital & Creative" },
              ].map(({ label, filter }) => (
                <div key={filter} className="relative group">
                  <button className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 font-medium ${SERVICES.filter(s=>s.cat===filter).some(s=>isActive(s.href)) ? "text-[#0038A0] font-bold" : "text-zinc-700 hover:text-[#0038A0]"}`}>{label} <span className="text-[10px] opacity-60 group-hover:rotate-180 transition-transform">▾</span></button>
                  <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block bg-white border-2 border-[#0038A0]/10 rounded-xl shadow-xl w-64 mt-2 z-50 overflow-hidden">
                    <div className="p-2 space-y-1">
                      {SERVICES.filter(s=>s.cat===filter).map(s=><Link key={s.slug} href={s.href} className="block px-3 py-2 rounded-lg hover:bg-[#F5F7FA] hover:text-[#002070] text-sm">{s.title}</Link>)}
                      {filter==="Power & Solar" && <><div className="border-t my-1" /><Link href="/services/maintenance" className="block px-3 py-2 rounded-lg hover:bg-[#F5F7FA] text-sm">Maintenance & Repair</Link></>}
                    </div>
                  </div>
                </div>
              ))}
              {/* ICT PRODUCTS — text only */}
              <div className="relative group">
                <button className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 font-medium ${isActive("/shop?category=ICT") ? "text-[#0038A0] font-bold" : "text-zinc-700 hover:text-[#0038A0]"}`}>ICT <span className="text-[10px] opacity-60 group-hover:rotate-180 transition-transform">▾</span></button>
                <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block bg-white border-2 border-[#0038A0]/10 rounded-xl shadow-xl w-52 mt-2 z-50 overflow-hidden">
                  <div className="p-2 space-y-1">
                    <Link href="/shop?category=ICT" className="block px-3 py-2 rounded-lg hover:bg-[#F5F7FA] hover:text-[#002070] text-sm font-semibold">All ICT Products</Link>
                    <div className="border-t my-1" />
                    {["Monitors","Laptops","Desktops","Printers","Peripherals","UPS & Power","Networking","Docking Stations"].map(l=>(
                      <Link key={l} href={`/shop?category=ICT&q=${l.toLowerCase().split(" ")[0]}`} className="block px-3 py-1.5 rounded-lg hover:bg-[#F5F7FA] hover:text-[#002070] text-xs">{l}</Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/shop" className={`px-2.5 py-1.5 rounded-lg transition font-medium ${isActive("/shop") ? "text-[#0038A0] font-bold" : "text-zinc-700 hover:text-[#0038A0]"}`}>Shop</Link>
              <Link href="/blog" className={`px-2.5 py-1.5 rounded-lg transition ${isActive("/blog") ? "text-[#0038A0] font-bold" : "text-zinc-700 hover:text-[#0038A0]"}`}>Blog</Link>
            </nav>

            {/* Right side — search, wishlist, cart (with Cart word), hamburger — Get Quote/Sign In moved to top bar */}
            <div className="flex items-center gap-1">
              {/* Search toggle */}
              <Button variant="ghost" size="icon" className="hover:text-[#0038A0] h-9 w-9" onClick={() => setSearchOpen(!searchOpen)}>
                <Search className="h-4 w-4" />
              </Button>
              {/* Wishlist */}
              <Link href="/wishlist" className="relative hidden sm:flex">
                <Button variant="ghost" size="icon" className="hover:text-[#0038A0] relative h-9 w-9">
                  <Heart className="h-4 w-4" />
                  {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#0038A0] text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 grid place-items-center">{wishlist.length}</span>}
                </Button>
              </Link>
              {/* Cart — bg blue, hover red, with word Cart next to icon */}
              <Link href="/cart" className="relative flex items-center gap-1.5 bg-[#0038A0] hover:bg-[#F00000] text-white px-3.5 py-1.5 rounded-full transition font-bold shadow-sm">
                <span className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-white text-[#F00000] text-[8px] font-black rounded-full h-4 w-4 grid place-items-center border-2 border-[#0038A0] group-hover:border-[#F00000]">{cartCount}</span>}
                </span>
                <span className="text-sm font-bold hidden sm:inline">Cart</span>
              </Link>
              {/* Hamburger */}
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
            </div>
          </div>
        </div>

        {/* Inline search bar — slides down when search icon clicked */}
        {searchOpen && (
          <div className="border-t bg-[#F5F7FA]/80">
            <div className="container mx-auto px-4 py-2">
              <form onSubmit={handleSearch} className="relative max-w-xl mx-auto flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input placeholder="Search CCTV, solar, biometrics, ICT products..." className="pl-10 pr-4 bg-white border-[#0038A0]/20 focus:border-[#0038A0] h-9 text-sm" value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
                </div>
                <Button type="submit" size="sm" className="h-9 px-4">Search</Button>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSearchOpen(false)}><X className="h-4 w-4" /></Button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto pt-2">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <button onClick={() => { setMobileOpen(false); router.push("/"); }} className="text-left"><img src="/syntechlogo.jpg" alt="Syntech" className="h-8 object-contain" /></button>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></Button>
            </div>
            <div className="px-4 py-3 space-y-1">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input placeholder="Search..." className="pl-10 text-sm h-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <Button type="submit" size="sm" className="h-9">Go</Button>
              </form>

              <Link href="/shop" onClick={() => setMobileOpen(false)} className="block py-2.5 font-medium text-sm">Shop</Link>

              {MOBILE_SECTIONS.map((section) => {
                const isOpen = expandedSection === section.key;
                const services = section.filter ? SERVICES.filter((s) => s.cat === section.filter) : null;
                const ictLinks = section.key === "ict" ? [
                  { label: "All ICT Products", href: "/shop?category=ICT" },
                  { label: "Monitors", href: "/shop?category=ICT&q=monitor" },
                  { label: "Laptops", href: "/shop?category=ICT&q=laptop" },
                  { label: "Desktops", href: "/shop?category=ICT&q=desktop" },
                  { label: "Printers", href: "/shop?category=ICT&q=printer" },
                  { label: "Peripherals", href: "/shop?category=ICT&q=keyboard" },
                  { label: "UPS & Power", href: "/shop?category=ICT&q=UPS" },
                  { label: "Networking", href: "/shop?category=ICT&q=router" },
                  { label: "Docking Stations", href: "/shop?category=ICT&q=dock" },
                ] : null;

                return (
                  <div key={section.key}>
                    <div className="flex items-center">
                      <Link
                        href={services ? `/services/${services[0].slug}` : (ictLinks ? "/shop?category=ICT" : "#")}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 py-2 text-sm font-medium"
                      >
                        {section.label}
                      </Link>
                      <button onClick={() => toggleSection(section.key)} className="p-2 rounded-lg hover:bg-zinc-100 transition" aria-label={`Toggle ${section.label}`}>
                        <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {isOpen && (
                      <div className="pl-3 border-l-2 ml-2 space-y-0.5 mb-2" style={{ borderColor: section.color + "40" }}>
                        {services && services.map((s) => (
                          <Link key={s.slug} href={s.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-zinc-600 hover:text-[#002070]">{s.title}</Link>
                        ))}
                        {services && section.key === "power" && (
                          <Link href="/services/maintenance" onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-zinc-600 hover:text-[#002070]">Maintenance & Repair</Link>
                        )}
                        {ictLinks && ictLinks.map((link) => (
                          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-zinc-600 hover:text-[#002070]">{link.label}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link href="/blog" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium">Blog</Link>

              {/* Get Quote / Sign In moved to top bar (red buttons) — removed from mobile drawer per request */}
              {session?.user && (session.user as any).role === "ADMIN" && (
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold text-[#F00000] border-t pt-3 mt-2">Admin Panel</Link>
              )}
            </div>
          </div>
        </>
      )}


    </header>
    </>
  );
}
