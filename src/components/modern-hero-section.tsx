"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatKES } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  image?: string | null;
  badge?: string | null;
  rating?: number;
  inStock?: boolean;
};

const promoStyles = [
  {
    bg: "bg-[#FFF7ED]",
    border: "border-[#FFEDD5]",
    badge: "bg-[#EA580C] text-white",
    accent: "text-[#EA580C]",
    label: "HOT DEAL",
  },
  {
    bg: "bg-[#EFF6FF]",
    border: "border-[#DBEAFE]",
    badge: "bg-[#0038A0] text-white",
    accent: "text-[#0038A0]",
    label: "NEW ARRIVAL",
  },
  {
    bg: "bg-[#F0FDF4]",
    border: "border-[#DCFCE7]",
    badge: "bg-[#15803D] text-white",
    accent: "text-[#15803D]",
    label: "SAVE BIG",
  },
  {
    bg: "bg-[#FEF2F2]",
    border: "border-[#FECACA]",
    badge: "bg-[#F00000] text-white",
    accent: "text-[#F00000]",
    label: "TOP RATED",
  },
];

function PromoCard({ product, style }: { product: Product; style: typeof promoStyles[number] }) {
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const addToCart = useStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  return (
    <div
      className={`rounded-[20px] border-2 ${style.bg} ${style.border} p-4 flex flex-col justify-between overflow-hidden relative group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-[320px] lg:h-[330px]`}
    >
      {/* subtle pattern */}
      <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/60 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-black/[0.03] rounded-full blur-xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Badge className={`${style.badge} border-0 text-[10px] tracking-widest font-black px-2 py-0.5 rounded-full`}>
            {product.badge || style.label}
          </Badge>
          {discount > 0 && (
            <span className="text-xs font-black bg-white border px-2 py-0.5 rounded-full shadow-sm">-{discount}%</span>
          )}
        </div>
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-bold text-sm leading-tight line-clamp-1 group-hover:text-black transition">
            {product.name}
          </h3>
        </Link>
      </div>

      <Link href={`/shop/${product.slug}`} className="relative flex-1 flex items-center justify-center my-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || ""}
          alt={product.name}
          className="max-h-[155px] lg:max-h-[175px] w-auto object-contain drop-shadow-sm group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </Link>

      <div className="relative">
        <div className="flex items-baseline gap-2 mb-2.5">
          <span className="font-black text-[18px] tracking-tight">{formatKES(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-zinc-400 line-through font-medium">{formatKES(product.oldPrice)}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/shop/${product.slug}`} className="flex-1">
            <Button
              size="sm"
              className="w-full rounded-full bg-zinc-900 hover:bg-black text-white text-xs h-8 font-semibold"
            >
              Shop Now <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full h-8 w-8 p-0 bg-white hover:bg-zinc-900 hover:text-white border-zinc-200 hidden sm:flex"
            onClick={() => {
              addToCart({ productId: product.id, slug: product.slug, name: product.name, price: product.price, qty: 1 });
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            title={added ? "Added!" : "Add to cart"}
          >
            {added ? "✓" : "+"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ModernHeroSection({ products }: { products: Product[] }) {
  // pick 4 for side cards
  const leftProducts = products.slice(0, 2);
  const rightProducts = products.slice(2, 4);
  // center carousel - use up to 5 products for slideshow
  const slides = products.slice(0, 5).length ? products.slice(0, 5) : products;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  const current = slides[index];

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  // fallback if no products
  if (!products.length) return null;

  return (
    <section className="bg-[#F8F9FB] border-b border-zinc-100">
      <div className="container mx-auto px-4 py-6 md:py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT — desktop only */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 order-2 lg:order-1">
            {leftProducts.map((p, i) => (
              <PromoCard key={p.id} product={p} style={promoStyles[i % promoStyles.length]} />
            ))}
          </div>

          {/* CENTER HERO — large banner with slideshow - bigger image, fewer words */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div
              className="relative rounded-[24px] overflow-hidden bg-white border border-zinc-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-[560px] md:h-[640px] lg:h-[676px]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Soft gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFF] via-white to-[#EFF6FF]" />
              <div className="absolute -top-20 -right-20 h-[420px] w-[420px] bg-[#0038A0]/[0.04] rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-[340px] w-[340px] bg-[#F00000]/[0.04] rounded-full blur-3xl" />
              {/* Dotted pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Content */}
              <div className="relative flex flex-col h-full p-5 md:p-7 lg:p-8">
                {/* Top badge row - minimal */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-[#0038A0] text-white border-0 rounded-full px-3 py-1 text-[11px] font-black tracking-widest">
                    SYNTECH
                  </Badge>
                </div>

                <h1 className="text-[26px] md:text-[34px] lg:text-[38px] font-black tracking-tight leading-[0.95]">
                  <span className="text-zinc-900">Secure.</span> <span className="text-[#0038A0]">Connected.</span>
                  <span className="text-[#F00000]"> Syntech.</span>
                </h1>
                <p className="mt-2 text-sm text-zinc-500 max-w-md">
                  CCTV • Biometrics • Solar • Networks
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/shop">
                    <Button size="lg" className="rounded-full h-10 px-6 bg-[#0038A0] hover:bg-[#002070] font-bold text-sm">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full h-10 px-6 bg-white border-zinc-200 text-sm font-semibold"
                    >
                      Get Quote
                    </Button>
                  </Link>
                </div>

                {/* Product slideshow area - BIGGER IMAGE */}
                <div className="flex-1 relative mt-5 min-h-[300px] flex items-center justify-center">
                  {/* Product image */}
                  <div className="relative w-full max-w-[520px] mx-auto">
                    <div className="relative bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-zinc-100 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={current.id}
                        src={current.image || ""}
                        alt={current.name}
                        className="relative h-[240px] md:h-[310px] lg:h-[340px] w-auto object-contain drop-shadow-md transition-all duration-500"
                      />
                      {/* floating price card - compact */}
                      <div className="absolute bottom-3 left-3 right-3 md:left-3 md:right-auto md:max-w-[240px] bg-zinc-900 text-white rounded-xl px-3 py-2.5 shadow-xl flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold text-sm leading-tight line-clamp-1">{current.name}</p>
                          <p className="font-black text-white text-sm">{formatKES(current.price)}</p>
                        </div>
                        <Link href={`/shop/${current.slug}`}>
                          <Button size="sm" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-100 h-7 px-3 text-xs font-bold shrink-0">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Nav arrows */}
                    <button
                      onClick={prev}
                      aria-label="Previous product"
                      className="absolute left-0 md:-left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white border shadow-md grid place-items-center hover:bg-zinc-900 hover:text-white transition -ml-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next product"
                      className="absolute right-0 md:-right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white border shadow-md grid place-items-center hover:bg-zinc-900 hover:text-white transition -mr-1"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Dots - minimal */}
                <div className="mt-4 flex items-center justify-center gap-1.5">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-6 bg-[#0038A0]" : "w-1.5 bg-zinc-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — desktop only */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 order-3">
            {rightProducts.map((p, i) => (
              <PromoCard key={p.id} product={p} style={promoStyles[(i + 2) % promoStyles.length]} />
            ))}
          </div>

          {/* MOBILE — 2x2 grid of promos below center - bigger images */}
          <div className="grid grid-cols-2 gap-4 lg:hidden order-2">
            {products.slice(0, 4).map((p, i) => (
              <div key={`m-${p.id}`} className="min-w-0">
                <div
                  className={`rounded-2xl border-2 ${promoStyles[i % promoStyles.length].bg} ${promoStyles[i % promoStyles.length].border} p-3 flex flex-col h-[290px] sm:h-[310px] overflow-hidden relative group hover:shadow-md transition`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={`${promoStyles[i % promoStyles.length].badge} border-0 text-[10px] px-2 py-0.5 rounded-full font-black`}>
                      {p.badge || promoStyles[i % promoStyles.length].label}
                    </Badge>
                    {p.oldPrice ? (
                      <span className="text-[11px] font-black bg-white border px-1.5 py-0.5 rounded-full">
                        -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                      </span>
                    ) : null}
                  </div>
                  <Link href={`/shop/${p.slug}`}>
                    <h3 className="font-bold text-xs leading-tight line-clamp-1">{p.name}</h3>
                  </Link>
                  <Link href={`/shop/${p.slug}`} className="flex-1 grid place-items-center my-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image || ""} alt={p.name} className="max-h-[130px] sm:max-h-[140px] object-contain" loading="lazy" />
                  </Link>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-black text-sm">{formatKES(p.price)}</span>
                    {p.oldPrice && <span className="text-[11px] line-through text-zinc-400">{formatKES(p.oldPrice)}</span>}
                  </div>
                  <Link href={`/shop/${p.slug}`}>
                    <Button size="sm" className="w-full rounded-full h-7 text-xs bg-zinc-900 hover:bg-black">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Micro features - minimal */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white border rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-sm">
            <div className="h-7 w-7 rounded-full bg-[#EFF6FF] grid place-items-center text-[#0038A0] text-xs">✓</div>
            <div><p className="font-bold text-zinc-900 text-xs">Free Delivery</p></div>
          </div>
          <div className="bg-white border rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-sm">
            <div className="h-7 w-7 rounded-full bg-[#FEF2F2] grid place-items-center text-[#F00000] text-xs">✓</div>
            <div><p className="font-bold text-zinc-900 text-xs">2-Hour Response</p></div>
          </div>
          <div className="bg-white border rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-sm">
            <div className="h-7 w-7 rounded-full bg-[#FFF7ED] grid place-items-center text-orange-600 text-xs">✓</div>
            <div><p className="font-bold text-zinc-900 text-xs">Install Available</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
