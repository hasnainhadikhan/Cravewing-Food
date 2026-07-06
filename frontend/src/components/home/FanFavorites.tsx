import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { menuCategories } from "../../constants/data";
import { CHAR, GOLD, RED } from "../../constants/brand";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

/**
 * A 3D coverflow carousel of fan-favorite categories, powered by Swiper with
 * autoplay + drag. Gives the page a tactile, gallery-like centerpiece.
 */
export default function FanFavorites() {
  const navigate = useNavigate();

  return (
    <div className="cravewing-swiper">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 32,
          stretch: 0,
          depth: 140,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{ delay: 2600, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ paddingBottom: 56 }}
      >
        {menuCategories.map((cat) => (
          <SwiperSlide
            key={cat.slug}
            style={{ width: 320, maxWidth: "80vw" }}
          >
            <div
              className="rounded-3xl overflow-hidden cursor-pointer relative group"
              style={{ height: 420, background: CHAR }}
              onClick={() => navigate("/menu")}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${CHAR}f2 0%, ${CHAR}55 45%, transparent 75%)`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div
                  className="text-xs font-bold tracking-widest mb-2"
                  style={{ color: GOLD, fontFamily: "Inter, sans-serif" }}
                >
                  FAN FAVORITE
                </div>
                <h3
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 30,
                    color: "#fff",
                    letterSpacing: 1,
                    lineHeight: 1,
                  }}
                >
                  {cat.title.toUpperCase()}
                </h3>
                <div
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-bold"
                  style={{ background: RED, color: "#fff", fontFamily: "Inter, sans-serif" }}
                >
                  Order <ArrowRight size={15} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
