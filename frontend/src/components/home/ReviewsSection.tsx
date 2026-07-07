import { Star, Quote } from "lucide-react";
import { RED, GOLD, CHAR, GREY } from "../../constants/brand";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Best wings in the city, hands down. The Nashville Hot actually brought a tear to my eye — worth every second. I come back weekly.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Fresh-cracked, hand-sauced, and always hot. The house ranch is dangerously good. Fast service too.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    rating: 4,
    text: "Loaded fries and a shake made my whole week. Great portions at a fair price, and the staff are super friendly.",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "The Mango Habanero glaze is unreal. Perfectly crispy tenders every single time. My go-to order.",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Jessica Lee",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Twelve sauces and I still can't pick a favorite. The Garlic Parm is a crowd-pleaser. Obsessed.",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Chris Thompson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "Fast, fresh, and never frozen — you can taste the difference. Everything we've tried has been a knockout.",
    date: "1 month ago",
  },
];

const stats = [
  { number: "1,000+", label: "Happy Customers" },
  { number: "4.9", label: "Average Rating" },
  { number: "500+", label: "5-Star Reviews" },
  { number: "4", label: "Years in Business" },
];

interface ReviewsSectionProps {
  /** Section background — cream by default; pass a color for variety per page. */
  background?: string;
}

/**
 * Social-proof section (stats + review cards). Reusable across pages so reviews
 * live inline instead of on a standalone page.
 */
export default function ReviewsSection({ background = "#FFF6EC" }: ReviewsSectionProps) {
  const { ref: r1, visible: v1 } = useScrollReveal();
  const { ref: r2, visible: v2 } = useScrollReveal();

  return (
    <Section style={{ background }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="Don't Take Our Word" sub="What the CraveWing crew says after their first bite — and every one after.">
          RAVE REVIEWS
        </SectionTitle>

        <div
          ref={r1}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14"
          style={{
            opacity: v1 ? 1 : 0,
            transform: v1 ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-7 rounded-2xl card-depth" style={{ background: "#fff" }}>
              <p style={{ fontFamily: "Anton, sans-serif", fontSize: 44, color: RED, marginBottom: 6 }}>
                {stat.number}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 15, fontWeight: 700 }}>
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
              className="p-7 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: "#eadfce", background: "#fff" }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < review.rating ? GOLD : "none"} color={i < review.rating ? GOLD : "#d1d5db"} />
                ))}
              </div>
              <Quote size={26} style={{ color: RED, opacity: 0.25 }} />
              <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 15.5, lineHeight: 1.75, marginTop: 8 }}>
                "{review.text}"
              </p>
              <div className="flex items-center gap-3.5 mt-6">
                <img src={review.avatar} alt={review.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p style={{ fontFamily: "Anton, sans-serif", fontSize: 17, color: CHAR }}>{review.name}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 13 }}>{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
