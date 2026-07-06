import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Clock, MapPin, ChefHat, CheckCircle, Package, ArrowRight, Bike } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import Section from "../components/ui/Section";

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order") || "BLAZIN-1234";
  const [status, setStatus] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) => Math.min(prev + 1, 4));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, title: "Order Received", icon: CheckCircle, description: "Your order has been received" },
    { id: 2, title: "Preparing", icon: ChefHat, description: "Our chefs are preparing your food" },
    { id: 3, title: "On the way", icon: Bike, description: "Your order is out for delivery" },
    { id: 4, title: "Delivered", icon: Package, description: "Your order has been delivered" },
  ];

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      <div className="relative pt-28 pb-16" style={{ background: CHAR, minHeight: 240 }}>
        <div className="relative max-w-6xl mx-auto px-6">
          <div
            className="text-sm font-bold tracking-widest mb-3"
            style={{ color: ORANGE, fontFamily: "Inter, sans-serif" }}
          >
            ORDER STATUS
          </div>
          <h1
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            TRACK YOUR ORDER
          </h1>
        </div>
      </div>

      <Section style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl mb-10" style={{ background: CREAM }}>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: GREY,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ORDER NUMBER
                </p>
                <p
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 32,
                    color: RED,
                  }}
                >
                  {orderId}
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: GREY,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ESTIMATED TIME
                </p>
                <p
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 32,
                    color: GOLD,
                  }}
                >
                  25-35 MIN
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="relative">
              <div
                className="absolute left-6 top-0 bottom-0 w-1"
                style={{ background: "#e5e7eb" }}
              />
              <div
                className="absolute left-6 top-0 w-1 transition-all duration-1000"
                style={{
                  height: `${((status) / 4) * 100}%`,
                  background: status === 4 ? "#10b981" : RED,
                }}
              />
              <div className="space-y-12">
                {steps.map((step, index) => {
                  const isActive = step.id <= status;
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="relative flex gap-6">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all ${
                    isActive ? "scale-110" : ""
                  }`}
                  style={{
                    background: isActive ? (step.id === 4 ? "#10b981" : RED) : "#fff",
                    border: `4px solid ${isActive ? (step.id === 4 ? "#10b981" : RED) : "#e5e7eb"}`,
                    boxShadow: isActive ? `0 0 20px ${(step.id === 4 ? "#10b981" : RED)}40` : "none",
                  }}
                      >
                        <Icon size={28} color="#fff" />
                      </div>
                      <div className="pt-2">
                        <h3
                          style={{
                            fontFamily: "Anton, sans-serif",
                            fontSize: 24,
                            color: isActive ? CHAR : GREY,
                            marginBottom: 4,
                          }}
                        >
                          {step.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            color: GREY,
                            fontSize: 16,
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-2xl" style={{ background: CREAM }}>
              <h3
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 20,
                  color: CHAR,
                  marginBottom: 16,
                }}
              >
                DELIVERY ADDRESS
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: GREY,
                  lineHeight: 1.8,
                }}
              >
                123 Main Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            <div className="p-8 rounded-2xl" style={{ background: CREAM }}>
              <h3
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 20,
                  color: CHAR,
                  marginBottom: 16,
                }}
              >
                CUSTOMER INFO
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: GREY,
                  lineHeight: 1.8,
                }}
              >
                John Doe<br />
                (555) 123-4567<br />
                john@example.com
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: CHAR, color: "#fff", fontFamily: "Inter, sans-serif" }}
            >
              Back to Home <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
