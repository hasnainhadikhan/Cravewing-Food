import { useState } from "react";
import {
  Flame,
  Drumstick,
  Sandwich,
  Utensils,
  UtensilsCrossed,
  CupSoda,
  Package,
  Heart,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Small favorite toggle shown on each menu card (top-right).
function FavHeart() {
  const [fav, setFav] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setFav((f) => !f);
      }}
      aria-label="Save to favorites"
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-110"
    >
      <Heart size={18} color="#D6291E" fill={fav ? "#D6291E" : "none"} strokeWidth={2.2} />
    </button>
  );
}
import { flyToCartFromEvent } from "../lib/cartFly";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";

// Category → branded icon (replaces emoji emblems in the data).
const CAT_ICONS: Record<string, LucideIcon> = {
  "Classic Wings": Drumstick,
  "Boneless Wings": Flame,
  Tenders: Utensils,
  Sandwiches: Sandwich,
  "Loaded Fries": UtensilsCrossed,
  "Shakes & Drinks": CupSoda,
  "Combo Meals": Package,
};
import { fullMenu, SAUCES_LIST } from "../constants/data";
import { useCart } from "../contexts/CartContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

type MenuItem = {
  name: string;
  price: string;
  desc: string;
  tags: string[];
  image: string;
};

export default function MenuPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState("Buffalo Classic");
  const { addToCart } = useCart();
  const { ref: heroRef, visible: heroVisible } = useScrollReveal(0.1);

  const handleAddToCart = (item: MenuItem, _category: string, e?: React.MouseEvent) => {
    if (e) flyToCartFromEvent(e, item.image);
    const priceNum = parseFloat(item.price.replace("$", ""));
    addToCart({
      id: item.name,
      name: item.name,
      price: priceNum,
      quantity: 1,
      description: item.desc,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen kraft">
      {/* Page header */}
      <div ref={heroRef} className="pt-28 pb-16 text-center bg-[#221A17]">
        <div
          className={`mx-auto max-w-4xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
          }`}
        >
          <h1 className="mx-auto text-[clamp(40px,7vw,72px)] font-[Anton,_sans-serif] tracking-[0.14em] text-white">
            THE MENU
          </h1>
          <p className="mx-auto mt-3 max-w-[600px] text-[18px] leading-8 text-white/70 font-[Inter,_sans-serif]">
            Discover the full Crave experience with our dynamic menu, featuring bold flavors and fresh ingredients crafted to ignite your taste buds.
          </p>
        </div>
      </div>

      {/* Sauce selector */}
      <div className="bg-[#D6291E] py-6">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-[13px] tracking-[0.35em] font-bold uppercase text-white/90 font-[Inter,_sans-serif] mb-3">
            CHOOSE YOUR SAUCE
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SAUCES_LIST.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSauce(s)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg font-[Inter,_sans-serif] ${
                  selectedSauce === s
                    ? "bg-[#FCB316] text-[#221A17] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                    : "bg-white/20 text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-20 z-30 shadow-md bg-white border-b-[2px] border-[#f0e0d0]">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-4">
          {fullMenu.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                activeTab === i
                  ? "bg-[#D6291E] text-white border-transparent"
                  : "bg-transparent text-[#5E5650] border-[#e0d0c0]"
              } font-[Inter,_sans-serif]`}
            >
              {(() => {
                const Icon = CAT_ICONS[cat.category] ?? Utensils;
                return <Icon size={17} strokeWidth={2.4} />;
              })()}
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        {fullMenu.map((cat, ci) => (
          <div key={cat.category} className={activeTab === ci ? "block" : "hidden"}>
            {/* Category Header */}
            <div className="mb-10 flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 overflow-hidden rounded-2xl bg-[#221A17] w-16 h-16 sm:w-20 sm:h-20">
                <img src={cat.image} alt={cat.category} className="h-full w-full object-cover" />
              </div>
              <h2 className="text-[clamp(28px,7vw,44px)] leading-tight font-[Anton,_sans-serif] tracking-[0.04em] text-[#221A17] uppercase">
                {cat.category}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-[0_1px_2px_rgba(34,26,23,0.05),0_12px_30px_-14px_rgba(34,26,23,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_46px_-18px_rgba(214,41,30,0.30)]"
                >
                  <FavHeart />

                  {/* Product image on a clean, light backdrop */}
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf3e9] to-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="food-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <h3 className="text-[17px] font-extrabold text-[#221A17] font-[Inter,_sans-serif]">
                        {item.name}
                      </h3>
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                            t.toLowerCase().includes("spicy")
                              ? "bg-[#D6291E]/[0.14] text-[#D6291E]"
                              : "bg-[#FCB316]/[0.15] text-[#8a6c00]"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-6 text-[#5E5650] font-[Inter,_sans-serif]">
                      {item.desc}
                    </p>

                    {(cat.category.includes("Wings") ||
                      cat.category.includes("Boneless") ||
                      cat.category.includes("Tender")) && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#F26B21] font-[Inter,_sans-serif]">
                        <Flame size={14} color={ORANGE} fill={ORANGE} strokeWidth={2.2} />
                        with {selectedSauce}
                      </p>
                    )}

                    {/* Price + add button pinned to the bottom for equal heights */}
                    <div className="mt-auto pt-4">
                      <div className="mb-3 text-[22px] font-[Anton,_sans-serif] text-[#221A17]">
                        {item.price}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(item, cat.category, e)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6291E] py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110 font-[Inter,_sans-serif]"
                      >
                        <Plus size={16} strokeWidth={3} /> Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
