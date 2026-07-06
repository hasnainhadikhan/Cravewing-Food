import { useState } from "react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import { fullMenu, SAUCES_LIST } from "../constants/data";
import { useCart } from "../contexts/CartContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSauce, setSelectedSauce] = useState("Buffalo Classic");
  const { addToCart } = useCart();
  const { ref: heroRef, visible: heroVisible } = useScrollReveal(0.1);

  const handleAddToCart = (item, category) => {
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
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      {/* Page header */}
      <div ref={heroRef} className="pt-28 pb-16 text-center" style={{ background: CHAR }}>
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            THE MENU
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)", marginTop: 12, fontSize: 18, maxWidth: 600, margin: "12px auto 0" }}>
            Discover the full Crave experience with our dynamic menu, featuring bold flavors and fresh ingredients crafted to ignite your taste buds.
          </p>
        </div>
      </div>

      {/* Sauce selector */}
      <div style={{ background: RED, padding: "24px 0" }}>
        <div className="max-w-7xl mx-auto px-4">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.9)",
              marginBottom: 12,
              textAlign: "center",
              letterSpacing: 3,
              fontWeight: 700,
            }}
          >
            CHOOSE YOUR SAUCE
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {SAUCES_LIST.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSauce(s)}
                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: selectedSauce === s ? GOLD : "rgba(255,255,255,0.18)",
                  color: selectedSauce === s ? CHAR : "#fff",
                  fontFamily: "Inter, sans-serif",
                  boxShadow: selectedSauce === s ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-20 z-30 shadow-md" style={{ background: "#fff", borderBottom: "2px solid #f0e0d0" }}>
        <div
          className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 py-4"
          style={{ scrollbarWidth: "none" }}
        >
          {fullMenu.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: activeTab === i ? RED : "transparent",
                color: activeTab === i ? "#fff" : GREY,
                fontFamily: "Inter, sans-serif",
                border: activeTab === i ? "none" : "2px solid #e0d0c0",
              }}
            >
              <span style={{ fontSize: 18 }}>{cat.icon}</span> {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {fullMenu.map((cat, ci) => (
        <div key={cat.category} className={activeTab === ci ? "block" : "hidden"}>
          {/* Category Header */}
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={cat.image} alt={cat.category} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 44,
                  color: CHAR,
                  letterSpacing: 1,
                  margin: 0,
                }}
              >
                {cat.category.toUpperCase()}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cat.items.map((item, index) => (
              <div
                key={item.name}
                className="bg-white rounded-3xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ borderColor: "#f0e0d0" }}
              >
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 800,
                          fontSize: 18,
                          color: CHAR,
                          margin: 0,
                        }}
                      >
                        {item.name}
                      </h3>
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            background: t.includes("Spicy") ? RED + "25" : GOLD + "35",
                            color: t.includes("Spicy") ? RED : "#8a6c00",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        color: GREY,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                    {(cat.category.includes("Wings") ||
                    cat.category.includes("Boneless") ||
                    cat.category.includes("Tender") ? (
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 12,
                          color: ORANGE,
                          marginTop: 8,
                          fontWeight: 700,
                        }}
                      >
                        🔥 with {selectedSauce}
                      </p>
                    ) : null)}
                  </div>
                  <div
                    style={{
                      fontFamily: "Anton, sans-serif",
                      fontSize: 24,
                      color: RED,
                      flexShrink: 0,
                    }}
                  >
                    {item.price}
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(item, cat.category)}
                  className="mt-4 w-full py-3 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] hover:brightness-110"
                  style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
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
