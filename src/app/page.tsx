import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { IMAGES } from "@/lib/images";
import { MOCK_PRODUCTS } from "@/lib/mock-products";
import { ModernHeroSection } from "@/components/modern-hero-section";
import { Phone, ShieldCheck, Clock, Award, ArrowRight, Building2, Home, Hotel, Landmark, GraduationCap, Stethoscope, Globe, Palette, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  try {
    // Get random products from all categories
    const products = await prisma.product.findMany({
      where: { active: true },
      orderBy: { sold: "desc" },
    });
    // Shuffle and pick 8
    const shuffled = products.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  const displayProducts = products.length
    ? products
    : ([...MOCK_PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 8) as any[]);

  return (
    <div className="flex flex-col">
      {/* Modern 3-Column Hero — center slideshow + side promos */}
      <ModernHeroSection products={displayProducts as any} />

      {/* Hero — Syntech dark with red accent (pushed below modern hero) */}
      <section className="relative overflow-hidden bg-[#002070] text-white">
        {/* Unsplash tech background */}
        <div className="absolute inset-0">
          <img src={IMAGES.hero.server} alt="Syntech security tech" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-[#002070]/90 to-[#0038A0]/60" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F00000]/15 via-transparent to-transparent" />
          {/* Accent line bottom — red */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F00000]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0038A0]/40" />
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-16 lg:py-20 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div>
            <Badge className="bg-[#F00000] text-white font-bold mb-4 border-0 px-3 py-1 text-xs tracking-widest shadow-md">NCA • EPRA • CAK • PSRA Licensed • Insured</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-[50px] font-black tracking-tight leading-[0.95]">
              <span className="text-white">Secure.</span> <span className="text-[#0064D8]">Connected.</span><br />
              <span className="text-[#F00000]">Powered by Syntech.</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-200 max-w-xl leading-relaxed">
              We don&apos;t just install — we <span className="text-white font-semibold underline decoration-[#F00000] decoration-2">protect what you&apos;ve built</span>. CCTV, biometrics, solar & networks with <span className="text-white font-semibold">5-year warranty</span> across 47 counties.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quote"><Button size="lg" className="shadow-lg shadow-[#F00000]/20 bg-[#0038A0] hover:bg-[#F00000]">Get Free Quote <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href={`tel:${SITE.phone}`}><Button size="lg" variant="outline" className="border-white/80 text-white hover:bg-[#F00000] hover:border-[#F00000] hover:text-white bg-transparent"><Phone className="h-4 w-4" /> Call {SITE.phoneDisplay}</Button></Link>
            </div>
            {/* Trust stats — red accent */}
            <div className="mt-8 grid grid-cols-3 gap-6 text-center border-t border-white/10 pt-6">
              <div><div className="text-2xl font-black text-white">500<span className="text-[#F00000]">+</span></div><div className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Projects</div></div>
              <div><div className="text-2xl font-black text-white">47<span className="text-[#F00000]"></span></div><div className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Counties</div></div>
              <div><div className="text-2xl font-black text-white">5<span className="text-[#F00000]"> Years</span></div><div className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Warranty</div></div>
            </div>
            <p className="mt-3 text-xs text-zinc-400">Trusted by Safaricom • Equity • KCB • Kenya Power — <span className="text-white">10 years of secure installs</span></p>
          </div>

          {/* Service quick select — elevated card with Unsplash thumb */}
          <Card className="bg-white text-zinc-900 shadow-2xl border-0 overflow-hidden">
            <div className="h-28 relative">
              <img src={IMAGES.services.cctv} alt="CCTV service" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">Select the service you need</p>
                  <p className="text-white/80 text-xs">We&apos;ll tailor a quote in 30 minutes</p>
                </div>
                <Badge className="bg-[#0038A0] text-white font-bold hidden sm:inline-flex">24/7</Badge>
              </div>
            </div>
            <CardContent className="grid grid-cols-2 gap-3 pt-4">
              {[
                ["CCTV Installation", "/services/cctv"],
                ["Biometric Access", "/services/biometrics"],
                ["Electric Fencing", "/services/electric-fence"],
                ["Automatic Gates", "/services/automatic-gates"],
                ["Fire Alarm", "/services/fire-alarm-systems"],
                ["Networking", "/services/networking"],
                ["Smart Home", "/services/smart-home-automation"],
                ["Solar Backup", "/services/solar-solutions"],
              ].map(([label, href]) => (
                <Link key={label} href={href} className="group rounded-xl border-2 border-zinc-100 p-3.5 hover:border-[#0038A0] hover:bg-[#F5F7FA] text-sm font-medium flex items-center justify-between transition">
                  {label} <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-[#0038A0] group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
              <Link href="/shop" className="col-span-2 mt-1"><Button className="w-full">Browse Products Store →</Button></Link>
              <p className="col-span-2 text-center text-xs text-zinc-500">Or <Link href="#contact" className="text-[#0038A0] underline font-medium">request site survey</Link> — free, no obligation</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Digital Creative — Website, Graphic & AI [ABOVE Shop Security] */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-[#F00000] text-white border-0 px-3 py-1 text-xs font-black tracking-widest rounded-full">DIGITAL CREATIVE STUDIO</Badge>
              <Badge variant="outline" className="hidden sm:inline-flex rounded-full border-[#0038A0]/20 text-[#0038A0] font-semibold">Web • Graphic • AI</Badge>
            </div>
            <h2 className="text-2xl md:text-[28px] font-black tracking-tight leading-tight">Websites. Graphics. <span className="text-[#0038A0]">AI Power.</span></h2>
            <p className="text-zinc-500 text-sm md:text-base mt-1">Beyond security — we build your digital presence. Modern, fast, and conversion-focused.</p>
          </div>
          <Link href="/quote" className="hidden md:inline-flex"><Button variant="outline" className="rounded-full border-[#0038A0] text-[#0038A0] hover:bg-[#0038A0] hover:text-white">Start a Project <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Website Design */}
          <Card className="overflow-hidden rounded-[20px] border-2 hover:border-[#0038A0]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
            <div className="h-44 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Website Design" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-white text-zinc-900 font-bold rounded-full shadow">Website Design</Badge>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white text-xs">
                <span className="h-7 w-7 rounded-full bg-white/20 backdrop-blur grid place-items-center"><Globe className="h-3.5 w-3.5" /></span>
                <span className="font-medium">Next.js • WordPress • E-commerce</span>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight flex items-center gap-2"><Globe className="h-5 w-5 text-[#0038A0]" /> High-Converting Websites</CardTitle>
              <p className="text-sm text-zinc-600 leading-relaxed">Business, portfolio & shop sites that load in &lt;2s, rank on Google & turn visitors into customers.</p>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col flex-1">
              <ul className="text-sm text-zinc-600 space-y-1.5 mb-4">
                <li className="flex gap-2"><span className="text-[#0038A0]">✓</span> Mobile-first • SEO ready • M-Pesa checkout</li>
                <li className="flex gap-2"><span className="text-[#0038A0]">✓</span> From <span className="font-bold text-zinc-900">KES 35,000</span> — 7 days delivery</li>
              </ul>
              <div className="mt-auto flex gap-2">
                <Link href="/services/website-design" className="flex-1"><Button className="w-full rounded-full">View Work</Button></Link>
                <Link href="/quote"><Button variant="outline" className="rounded-full">Quote</Button></Link>
              </div>
            </CardContent>
          </Card>

          {/* Graphic Design */}
          <Card className="overflow-hidden rounded-[20px] border-2 hover:border-[#F00000]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
            <div className="h-44 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80" alt="Graphic Design" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-[#F00000] text-white font-bold rounded-full shadow border-0">Graphic Design</Badge>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white text-xs">
                <span className="h-7 w-7 rounded-full bg-white/20 backdrop-blur grid place-items-center"><Palette className="h-3.5 w-3.5" /></span>
                <span className="font-medium">Brand • Print • Social</span>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight flex items-center gap-2"><Palette className="h-5 w-5 text-[#F00000]" /> Brand & Visual Identity</CardTitle>
              <p className="text-sm text-zinc-600 leading-relaxed">Logos, brand guides, posters, packaging & social kits that make you unforgettable.</p>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col flex-1">
              <ul className="text-sm text-zinc-600 space-y-1.5 mb-4">
                <li className="flex gap-2"><span className="text-[#F00000]">✓</span> Logo, business cards, flyers, banners</li>
                <li className="flex gap-2"><span className="text-[#F00000]">✓</span> From <span className="font-bold text-zinc-900">KES 5,000</span> — 48hr turnaround</li>
              </ul>
              <div className="mt-auto flex gap-2">
                <Link href="/services/graphic-design" className="flex-1"><Button variant="secondary" className="w-full rounded-full bg-zinc-900 hover:bg-black text-white">See Portfolio</Button></Link>
                <Link href="/quote"><Button variant="outline" className="rounded-full">Quote</Button></Link>
              </div>
            </CardContent>
          </Card>

          {/* AI Solutions */}
          <Card className="overflow-hidden rounded-[20px] border-2 hover:border-[#0038A0]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col bg-gradient-to-br from-white to-[#F5F7FA]">
            <div className="h-44 relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" alt="AI Solutions" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002070]/80 via-[#002070]/20 to-transparent" />
              <Badge className="absolute top-3 left-3 bg-[#0038A0] text-white font-bold rounded-full shadow border-0">AI Solutions</Badge>
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white text-xs">
                <span className="h-7 w-7 rounded-full bg-white/20 backdrop-blur grid place-items-center"><Sparkles className="h-3.5 w-3.5" /></span>
                <span className="font-medium">Chatbots • Automation • Analytics</span>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight flex items-center gap-2"><Sparkles className="h-5 w-5 text-[#0038A0]" /> AI for Business</CardTitle>
              <p className="text-sm text-zinc-600 leading-relaxed">Automate support, generate content & get insights — AI tailored for Kenyan businesses.</p>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col flex-1">
              <ul className="text-sm text-zinc-600 space-y-1.5 mb-4">
                <li className="flex gap-2"><span className="text-[#0038A0]">✓</span> WhatsApp bots, lead qualification</li>
                <li className="flex gap-2"><span className="text-[#0038A0]">✓</span> From <span className="font-bold text-zinc-900">KES 15,000</span>/mo — demo in 24hrs</li>
              </ul>
              <div className="mt-auto flex gap-2">
                <Link href="/services/ai-solutions" className="flex-1"><Button className="w-full rounded-full bg-[#0038A0] hover:bg-[#002070]">Explore AI</Button></Link>
                <Link href="/quote"><Button variant="outline" className="rounded-full">Quote</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-6 md:hidden"><Link href="/quote"><Button variant="outline" className="w-full rounded-full">Start a Digital Project</Button></Link></div>
      </section>

      {/* Featured Products — with brand accent header */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl md:text-[28px] font-black tracking-tight">Shop Security & IT Equipment</h2>
              <Badge className="bg-[#0038A0] text-white hidden md:inline-flex">5-Yr Warranty</Badge>
            </div>
            <p className="text-zinc-500 text-sm md:text-base">Genuine products • Supply & Install • <span className="text-[#0038A0] font-medium">5-year workmanship warranty</span></p>
          </div>
          <Link href="/shop" className="hidden md:inline-flex text-sm font-semibold text-[#0038A0] hover:text-[#0038A0] hover:underline items-center gap-1">Browse All Products <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {displayProducts.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-6 md:hidden"><Link href="/shop"><Button variant="outline" className="w-full">Browse All Products</Button></Link></div>
      </section>

      {/* Three promo blocks — with Unsplash images */}
      <section className="container mx-auto px-4 grid lg:grid-cols-3 gap-6">
        <Card className="bg-[#002070] text-white border-0 overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <img src={IMAGES.products.solar} alt="Solar backup" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#002070] via-[#002070]/90 to-[#002070]/70" />
          <CardHeader className="relative"><Badge className="bg-[#F00000] text-white w-fit font-bold">Power protection</Badge><CardTitle className="text-white mt-3 leading-tight">Your Home shouldn&apos;t go dark</CardTitle></CardHeader>
          <CardContent className="relative"><p className="text-zinc-300 text-sm leading-relaxed">Solar backup keeps your CCTV, electric fence & lights running during blackouts. Bundles from <span className="text-white font-bold">KES 85,000</span>.</p><Link href={`https://wa.me/${SITE.whatsapp}`} target="_blank"><Button variant="secondary" className="mt-4 w-full bg-white text-[#002070] hover:bg-zinc-100 border-0 font-semibold">Get Backup Quote</Button></Link></CardContent>
          <div className="absolute top-0 right-0 h-1 w-full bg-[#0038A0]" />
        </Card>

        <Card className="overflow-hidden">
          <div className="h-32 relative">
            <img src={IMAGES.services.estate} alt="Diaspora homes" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-3 left-3 bg-white text-black font-semibold">Owners Abroad</Badge>
          </div>
          <CardHeader className="pb-3"><CardTitle className="text-lg leading-tight">Building a Home in Kenya While Abroad?</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-zinc-600 leading-relaxed">We install CCTV, fences, gates & smart systems for diaspora homeowners with full remote monitoring & video updates.</p><Link href="/about"><Button className="mt-4 w-full">Start WhatsApp Consultation</Button></Link></CardContent>
        </Card>

        <Card className="bg-[#F5F7FA] border-[#0038A0]/20 overflow-hidden">
          <CardHeader><Badge className="bg-[#0038A0] text-white w-fit font-bold">Estate Solutions</Badge><CardTitle className="leading-tight">Securing 50–200 Homes Under One Contract</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-xl overflow-hidden mb-3 h-28">
              <img src={IMAGES.services.estate} alt="Estate" className="h-full w-full object-cover" />
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed">Bulk pricing & dedicated maintenance for HOAs. <span className="font-bold text-[#002070]">15+ estates, 2,000+ homes secured.</span></p>
            <Link href="/estates"><Button variant="secondary" className="mt-4 w-full">View Estate Solutions</Button></Link>
          </CardContent>
        </Card>
      </section>

      {/* Why Syntech — lime icons */}
      <section className="container mx-auto px-4 py-10 md:py-12 grid md:grid-cols-3 gap-5">
        {[
          { icon: ShieldCheck, title: "Licensed & Insured", desc: "NCA, EPRA, CAK & PSRA. Contractor's all-risk insurance KES 50M." },
          { icon: Award, title: "5-Year Warranty", desc: "Industry gives 1 year. We give you 5 — free. The Syntech difference." },
          { icon: Clock, title: "2-Hour Response", desc: "Nairobi, Mombasa, Kisumu. 2 hours, not 2 days. 24/7 emergency." },
        ].map((f) => (
          <Card key={f.title} className="border-2 hover:border-[#0038A0]/30 hover:shadow-md transition">
            <CardContent className="pt-6 flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-[#0038A0] text-white grid place-items-center shrink-0 shadow-sm">
                <f.icon className="h-5 w-5" />
              </div>
              <div><h3 className="font-bold">{f.title}</h3><p className="text-sm text-zinc-600 leading-relaxed mt-1">{f.desc}</p></div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* How it works — lime numbered */}
      <section className="bg-[#F5F7FA] dark:bg-zinc-900 border-y border-[#0038A0]/10 overflow-hidden">
        <div className="container mx-auto px-4 py-10 md:py-12 overflow-hidden">
          <h2 className="text-2xl md:text-[26px] font-black text-center tracking-tight">From Quote to Commissioned in Days.</h2>
          <p className="text-center text-zinc-500 text-sm mt-1">Transparent process • No hidden costs • Certified technicians</p>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {[
              ["1", "Budget Estimate", "Customized quote in 30 min."],
              ["2", "Custom Design", "Tailored to site & budget."],
              ["3", "Install", "Certified techs, 1–3 days."],
              ["4", "Handover", "Training + 24/7 support."],
            ].map(([n, t, d], idx) => (
              <div key={n} className="text-center relative">
                <div className="mx-auto h-11 w-11 rounded-full bg-[#0038A0] text-white grid place-items-center font-black shadow relative z-10"> {n}</div>
                {idx < 3 && <div className="hidden md:block absolute top-[22px] left-[55%] w-[90%] h-0.5 bg-[#0038A0]/20 -z-0" />}
                <h4 className="font-bold mt-3">{t}</h4><p className="text-sm text-zinc-500 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container mx-auto px-4 py-10 md:py-12">
        <h2 className="text-2xl font-black tracking-tight">Every Sector. Every Scale.</h2>
        <p className="text-zinc-500 text-sm">From single homes to 200-home estates — we scale with you.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {[
            [Home, "Residential"],
            [Building2, "Commercial"],
            [Landmark, "Banking & Finance"],
            [Stethoscope, "Healthcare"],
            [GraduationCap, "Education"],
            [Hotel, "Government"],
          ].map(([Icon, label]) => {
            const I = Icon as any;
            return (
              <Card key={label as string} className="hover:border-[#0038A0]/30 hover:shadow-sm transition group">
                <CardContent className="pt-6 text-center">
                  <div className="h-10 w-10 rounded-xl bg-[#F5F7FA] group-hover:bg-[#0038A0] text-[#0038A0] group-hover:text-black grid place-items-center mx-auto transition">
                    <I className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold mt-3">{label as string}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Trust logos + reviews — with Unsplash office image accent */}
      <section className="container mx-auto px-4 pb-10 md:pb-12 grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="h-24 relative">
            <img src={IMAGES.about.office} alt="Office" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6">
              <h3 className="text-white font-black text-lg">Trusted By — 10+ Years</h3>
            </div>
          </div>
          <CardContent className="flex flex-wrap gap-2.5 text-sm text-zinc-600 pt-4">
            {["Safaricom","Equity Bank","KCB","Kenya Power","NCBA","Nation Media","Kenya Airways","UoN","Co-op Bank"].map(b=>(
              <span key={b} className="border border-[#0038A0]/20 px-3 py-1.5 rounded-full bg-[#F5F7FA] font-medium hover:bg-[#0038A0] hover:text-black hover:border-[#0038A0] transition cursor-default">{b}</span>
            ))}
          </CardContent>
        </Card>
        <Card className="border-[#0038A0]/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">Client Reviews <span className="text-[#0038A0]">★★★★★</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <blockquote className="border-l-[3px] border-[#0038A0] pl-3 bg-[#F5F7FA]/60 py-2 rounded-r">“32-camera CCTV installed in 2 days with zero disruption.” <br /><span className="text-zinc-500">— James Mutua, Facilities Manager</span></blockquote>
            <blockquote className="border-l-[3px] border-[#0038A0] pl-3">“Electric bill dropped from KES 45K to under 8K.” <br /><span className="text-zinc-500">— Amina Kariuki, Factory Owner</span></blockquote>
            <blockquote className="border-l-[3px] border-[#0038A0] pl-3">“90-minute emergency response at 11pm. Unmatched.” <br /><span className="text-zinc-500">— David Omondi, Hotel GM</span></blockquote>
          </CardContent>
        </Card>
      </section>

      {/* Credentials + Contact */}
      <section id="contact" className="container mx-auto px-4 pb-12 grid lg:grid-cols-2 gap-6 md:gap-8">
        <Card className="overflow-hidden">
          <div className="h-1 bg-[#0038A0]" />
          <CardHeader><CardTitle>Certified. Verified. Insured.</CardTitle><p className="text-sm text-zinc-500">We don&apos;t just claim it — we document it.</p></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div className="border-2 border-[#0038A0]/20 rounded-xl p-3 bg-[#F5F7FA]/40"><p className="font-bold">NCA Licensed</p><p className="text-zinc-500 text-xs mt-1">NCA/2023/45678 • Active 2026</p></div>
            <div className="border rounded-xl p-3"><p className="font-bold">EPRA Certified</p><p className="text-zinc-500 text-xs mt-1">EC/2022/12345 • Active 2026</p></div>
            <div className="border rounded-xl p-3"><p className="font-bold">PSRA Licensed</p><p className="text-zinc-500 text-xs mt-1">PSRA/2021/78901 • Active 2026</p></div>
            <div className="border rounded-xl p-3"><p className="font-bold">ISO 9001:2015</p><p className="text-zinc-500 text-xs mt-1">Quality Management • Certified</p></div>
            <div className="col-span-2 mt-2 text-sm space-y-1 bg-[#002070] text-white rounded-xl p-4">
              <p>📞 <Link href={`tel:${SITE.phone}`} className="underline hover:text-[#0038A0]">{SITE.phone}</Link> • 💬 <Link href={`https://wa.me/${SITE.whatsapp}`} className="underline hover:text-[#0038A0]">WhatsApp</Link></p>
              <p>✉️ {SITE.email} • 📍 {SITE.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#0038A0]/30 shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2">Ready to Protect What Matters? <span className="h-2 w-2 rounded-full bg-[#0038A0] animate-pulse" /></CardTitle><p className="text-sm text-zinc-500">Free site survey • No-obligation quote • Same-week installation • We reply in 2hrs</p></CardHeader>
          <CardContent>
            <form action="/api/leads" method="post" className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="name" placeholder="Full name *" required className="border-2 border-zinc-200 focus:border-[#0038A0] focus:ring-[#0038A0] rounded-lg px-3 py-2.5 text-sm outline-none transition" />
                <input name="phone" placeholder="Phone *" required className="border-2 border-zinc-200 focus:border-[#0038A0] focus:ring-[#0038A0] rounded-lg px-3 py-2.5 text-sm outline-none transition" />
              </div>
              <input name="email" placeholder="Email" className="border-2 border-zinc-200 focus:border-[#0038A0] rounded-lg px-3 py-2.5 text-sm w-full outline-none transition" />
              <select name="service" className="border-2 border-zinc-200 focus:border-[#0038A0] rounded-lg px-3 py-2.5 text-sm w-full outline-none bg-white">
                <option value="">Service Required *</option>
                <option>CCTV</option><option>Access Control</option><option>Solar</option><option>Electrical</option><option>Other</option>
              </select>
              <textarea name="message" placeholder="Tell us about your site / location..." rows={3} className="border-2 border-zinc-200 focus:border-[#0038A0] rounded-lg px-3 py-2.5 text-sm w-full outline-none transition" />
              <Button type="submit" className="w-full text-base h-11">Send Request — We Reply in 2hrs</Button>
              <p className="text-xs text-zinc-500 text-center">By submitting you agree to our Privacy Policy. 1-click WhatsApp quote also available.</p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
