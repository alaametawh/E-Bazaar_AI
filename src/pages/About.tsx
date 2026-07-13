import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Divider from "../components/Divider";
import Footer from "@/components/Footer";
import aboutLogo from "../assets/aboutLogo.webp";
import img1 from "../assets/1.webp";
import img2 from "../assets/2.webp";
import img3 from "../assets/3.webp";
import img4 from "../assets/4.webp";
import img5 from "../assets/5.webp";
import img6 from "../assets/6.webp";


interface TextBlockContent {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
}

interface GalleryItem {
  src: string;
  caption: string;
}

const ABOUT_TEXT: TextBlockContent = {
  eyebrow: "Our Story",
  heading: "About",
  headingAccent: "E-Bazaar",
  body: "We are E-Bazaar, a widely known store with many branches around Cairo, Aswan And Alexandria, that sells unique and well made souvenirs and antiques that represent our Egyptian culture for all tourists for an affordable price and with great endurance. we sell many kinds of souvenirs like ancient medals, bracelets, mini-statues that represents our culture. In case you can't visit us, you can purchase whatever you want from our store and order it to wherever you're located with free-shipping",
};

const WHY_US_TEXT: TextBlockContent = {
  eyebrow: "Why Choose Us",
  heading: "Why",
  headingAccent: "Shop With Us",
  body: "Discover a world of unique, high-quality antiques that you won't find anywhere else, all crafted for maximum durability at budget-friendly prices. Beyond our one-of-a-kind collection, we can bring your exact vision to life with custom-made antiques tailored to your description. Take advantage of our incredible sales today, and enjoy the added perk of free shipping on every single order!",
};

const GALLERY: GalleryItem[] = [
  { src: img1, caption: "what we sell" },
  { src: img2, caption: "friendly bargaining about the price" },
  { src: img3, caption: "shop interior" },
  { src: img4, caption: "attracting tourists in a friendly manner" },
  { src: img5, caption: "explaining the history of the antique" },
  { src: img6, caption: "impressed tourists of the culture" },
];
// --------------------------------------


const Logo = () => (
  <div
    className="flex flex-col items-center justify-center gap-4 p-10 border border-amber-500/20 rounded-2xl bg-accent/5"
  >
    <svg viewBox="0 0 60 52" className="w-20 h-20 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M30 4 L56 46 L4 46 Z" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="3" fill="currentColor" stroke="none" />
    </svg>
    <div className="text-center">
      <p className="text-2xl tracking-[0.2em] text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>BAZAAR</p>
      <p className="text-[10px] tracking-[0.35em] text-amber-500/80 mt-1">AL-QAHIRA</p>
    </div>
  </div>
);

const TextBlock = ({ eyebrow, heading, headingAccent, body }: TextBlockContent) => (
  <div>
    <p className="text-[11px] tracking-[0.3em] text-amber-500/80 mb-3 font-default">{eyebrow.toUpperCase()}</p>
    <h2 className="text-4xl md:text-5xl text-stone-100 mb-2 font-header">
      {heading}{" "}
      <span className="text-amber-500 italic">{headingAccent}</span>
    </h2>
    <div className="h-px w-20 bg-amber-500/40 my-5" />
    <p className="text-stone-400 leading-relaxed text-[15px] ">{body}</p>
  </div>
);

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length));
  };
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % GALLERY.length));
  };

  return (
    <div className="min-h-screen w-full text-text font-default bg-bg">

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-28">

        {/* About Us */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <Logo />
          <TextBlock {...ABOUT_TEXT} />
        </section>

        <Divider />

        {/* Why Us */}
        <section className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div className="order-2 md:order-1">
            <TextBlock {...WHY_US_TEXT} />
          </div>
          <div className="order-1 md:order-2">
            <img src={aboutLogo} alt="Artisan at work" className="w-full rounded-lg border border-amber-500/20" />
          </div>
        </section>

        <Divider />

        {/* Our Work */}
        <section>
          <div className="text-center my-12">
            <p className="text-[11px] tracking-[0.3em] text-amber-500/80 mb-3">CRAFTSMANSHIP</p>
            <h2 className="text-4xl md:text-5xl text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our <span className="text-amber-500 italic">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group relative aspect-4/3 overflow-hidden rounded-lg border border-amber-500/10"
              >
                <img src={item.src} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-4">
                  <p className="text-xs text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setActiveIndex(null)}
        >
          <button onClick={() => setActiveIndex(null)} className="absolute top-6 right-6 text-stone-300 hover:text-amber-500">
            <X size={28} />
          </button>
          <button onClick={showPrev} className="absolute left-4 md:left-10 text-stone-300 hover:text-amber-500">
            <ChevronLeft size={36} />
          </button>
          <button onClick={showNext} className="absolute right-4 md:right-10 text-stone-300 hover:text-amber-500">
            <ChevronRight size={36} />
          </button>

          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[activeIndex].src}
              alt={GALLERY[activeIndex].caption}
              className="w-full max-h-[75vh] object-contain rounded-lg border border-amber-500/20"
            />
            <p className="text-center text-stone-400 text-sm mt-4">{GALLERY[activeIndex].caption}</p>
            <p className="text-center text-amber-500/60 text-xs mt-1">{activeIndex + 1} / {GALLERY.length}</p>
          </div>
        </div>
      )}
    <Footer />
    </div>
  );
}