import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChefHat, Check, Package, ArrowRight, Bike } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import Section from "../components/ui/Section";
import { get } from "../lib/api";

interface OrderData {
  reference: string;
  email: string;
  first_name?: string | null;
  last_name: string;
  phone?: string | null;
  address: string;
  apartment?: string | null;
  city: string;
  postal_code?: string | null;
  status: string;
}

const STATUS_STEP: Record<string, number> = {
  received: 1,
  preparing: 2,
  on_the_way: 3,
  delivered: 4,
};

export default function OrderTrackingPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order") || "CRAVE-1234";
  const [status, setStatus] = useState(1);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Pull the real order details from the API (falls back gracefully if offline).
  useEffect(() => {
    if (!orderId) return;
    let active = true;
    get<OrderData>(`/orders/${orderId}`)
      .then((o) => {
        if (!active) return;
        setOrder(o);
        setStatus(STATUS_STEP[o.status] ?? 1);
      })
      .catch(() => {})
      .finally(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, [orderId]);


  const customerName = order
    ? `${order.first_name ?? ""} ${order.last_name}`.trim()
    : "";

  const steps = [
    { id: 1, title: "Order Received", icon: Check, description: "Your order has been received" },
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

          <div className="mb-14 overflow-x-auto">
            <div className="relative min-w-[520px] px-2">
              {/* Horizontal track between the first and last icon centers (each 12.5% in) */}
              <div className="absolute top-[26px] left-[12.5%] right-[12.5%] h-1 rounded-full" style={{ background: "#e5e7eb" }} />
              {/* Progress fill — static, sized to the current status */}
              <div
                className="absolute top-[26px] left-[12.5%] h-1 rounded-full"
                style={{
                  width: `${(Math.max(status - 1, 0) / 3) * 75}%`,
                  background: status === 4 ? "#10b981" : `linear-gradient(90deg, ${RED}, ${ORANGE})`,
                }}
              />

              <div className="grid grid-cols-4 gap-2">
                {steps.map((step) => {
                  const done = step.id < status;
                  const current = step.id === status;
                  const isActive = step.id <= status;
                  const Icon = done ? Check : step.icon;
                  const color = step.id === 4 && isActive ? "#10b981" : RED;
                  return (
                    <div key={step.id} className="flex flex-col items-center text-center px-1">
                      <div className="relative z-10 w-14 h-14 mb-4">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: isActive ? color : "#fff",
                            border: `4px solid ${isActive ? color : "#e5e7eb"}`,
                            boxShadow: isActive ? `0 0 24px ${color}55` : "none",
                          }}
                        >
                          <Icon size={done ? 28 : 26} color={isActive ? "#fff" : "#cbd5e1"} strokeWidth={done ? 3 : 2.4} />
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <h3
                          className="text-[15px] sm:text-[19px]"
                          style={{ fontFamily: "Anton, sans-serif", color: isActive ? CHAR : GREY, letterSpacing: 0.3 }}
                        >
                          {step.title}
                        </h3>
                        {current && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ background: `${color}1f`, color, fontFamily: "Inter, sans-serif" }}
                          >
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="mt-1" style={{ fontFamily: "Inter, sans-serif", color: GREY, fontSize: 13.5, lineHeight: 1.5 }}>
                        {step.description}
                      </p>
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
                {order ? (
                  <>
                    {order.address}
                    {order.apartment ? <>, {order.apartment}</> : null}
                    <br />
                    {order.city}
                    {order.postal_code ? ` ${order.postal_code}` : ""}
                  </>
                ) : (
                  loaded ? "Address on file" : "Loading delivery details…"
                )}
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
                {order ? (
                  <>
                    {customerName || "—"}<br />
                    {order.phone || "No phone provided"}<br />
                    {order.email}
                  </>
                ) : (
                  loaded ? "Details on file" : "Loading customer details…"
                )}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
