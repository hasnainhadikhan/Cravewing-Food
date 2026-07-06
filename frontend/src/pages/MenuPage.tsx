import { useState } from "react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
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

  const handleAddToCart = (item: MenuItem, category: string) => {
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
    <div className="min-h-screen bg-[#FFF6EC]">
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
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 font-[Inter,_sans-serif] ${
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
              <span className="text-[18px]">{cat.icon}</span> {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        {fullMenu.map((cat, ci) => (
          <div key={cat.category} className={activeTab === ci ? "block" : "hidden"}>
            {/* Category Header */}
            <div className="mb-10 flex items-center gap-6">
              <div className="flex-shrink-0 overflow-hidden rounded-2xl bg-[#221A17] w-20 h-20">
                <img src={cat.image} alt={cat.category} className="h-full w-full object-cover" />
              </div>
              <h2 className="text-[44px] font-[Anton,_sans-serif] tracking-[0.04em] text-[#221A17] uppercase">
                {cat.category}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="overflow-hidden rounded-3xl border-2 border-[#f0e0d0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[18px] font-black text-[#221A17] font-[Inter,_sans-serif]">
                            {item.name}
                          </h3>
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
                                t.toLowerCase().includes("spicy")
                                  ? "bg-[#D6291E]/[0.14] text-[#D6291E]"
                                  : "bg-[#FCB316]/[0.15] text-[#8a6c00]"
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm leading-7 text-[#5E5650] font-[Inter,_sans-serif]">{item.desc}</p>
                        {(cat.category.includes("Wings") ||
                          cat.category.includes("Boneless") ||
                          cat.category.includes("Tender")) && (
                          <p className="text-sm font-semibold text-[#F26B21] font-[Inter,_sans-serif]">
                            🔥 with {selectedSauce}
                          </p>
                        )}
                      </div>
                      <div className="whitespace-nowrap text-[24px] font-[Anton,_sans-serif] text-[#D6291E]">
                        {item.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item, cat.category)}
                      className="w-full rounded-xl bg-[#D6291E] py-3 text-lg font-bold text-white transition duration-200 hover:brightness-110 font-[Inter,_sans-serif]"
                    >
                      Add to Order
                    </button>
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
