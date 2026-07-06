import { Star, Quote } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY, IMGS } from "../constants/brand";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "The best gyro I've ever had! The flavors are incredible and the portions are huge. I come here every week!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Fresh ingredients, amazing service, and the food is always hot and delicious. Highly recommend!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    rating: 4,
    text: "Great food at reasonable prices. The staff is super friendly and the atmosphere is welcoming.",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Their chicken platter is absolutely amazing! Perfectly seasoned and cooked to perfection.",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Jessica Lee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Best Mediterranean food in the city! The sauces are incredible. I'm obsessed!",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Chris Thompson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Fast, fresh, and delicious! Everything we've tried has been amazing. Great value too.",
    date: "1 month ago",
  },
];

export default function ReviewsPage() {
  const { ref: r1, visible: v1 } = useScrollReveal();
  const { ref: r2, visible: v2 } = useScrollReveal();

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      <div className="relative pt-28 pb-20 overflow-hidden" style={{ background: CHAR, minHeight: 320 }}>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className="text-sm font-bold tracking-widest mb-4"
            style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
          >
            WHAT OUR CUSTOMERS SAY
          </div>
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(44px, 7vw, 72px)",
              color: "#fff",
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            REVIEWS
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.75)",
              marginTop: 24,
              fontSize: 18,
              lineHeight: 1.8,
              maxWidth: 600,
              margin: "24px auto 0",
            }}
          >
            See what our amazing customers have to say about Crave Chicken & Gyro!
          </p>
        </div>
      </div>

      <Section style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto">
          <div
            ref={r1}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            style={{
              opacity: v1 ? 1 : 0,
              transform: v1 ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {[
              { number: "1,000+", label: "Happy Customers" },
              { number: "4.9", label: "Average Rating" },
              { number: "500+", label: "5-Star Reviews" },
              { number: "4", label: "Years in Business" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl"
                style={{ background: "#fff" }}
              >
                <p
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 48,
                    color: RED,
                    marginBottom: 8,
                  }}
                >
                  {stat.number}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: GREY,
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div
            ref={r2}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              opacity: v2 ? 1 : 0,
              transform: v2 ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ borderColor: "#e0d0c0", background: "#fff" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < review.rating ? GOLD : "none"}
                      color={i < review.rating ? GOLD : "#d1d5db"}
                    />
                  ))}
                </div>
                <div className="mb-6">
                  <Quote size={28} style={{ color: RED, opacity: 0.3 }} />
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: GREY,
                      fontSize: 16,
                      lineHeight: 1.8,
                      marginTop: 8,
                    }}
                  >
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "Anton, sans-serif",
                        fontSize: 18,
                        color: CHAR,
                      }}
                    >
                      {review.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: GREY,
                        fontSize: 14,
                      }}
                    >
                      {review.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
