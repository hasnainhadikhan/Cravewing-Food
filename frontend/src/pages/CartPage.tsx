import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Drumstick, Gift } from "lucide-react";
import { RED, ORANGE, GOLD, CHAR, CREAM, GREY } from "../constants/brand";
import { useCart } from "../contexts/CartContext";
import { useScrollReveal } from "../hooks/useScrollReveal";
import React from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { ref: heroRef, visible: heroVisible } = useScrollReveal(0.1);
  const { ref: cartRef, visible: cartVisible } = useScrollReveal(0.15);

  return (
    <div style={{ background: CREAM, minHeight: "100vh" }}>
      <div ref={heroRef} className="pt-28 pb-12 text-center" style={{ background: CHAR }}>
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <h1 style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(40px, 7vw, 72px)",
            color: "#fff",
            letterSpacing: 2,
          }}>Your Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {cart.length === 0 ? (
          <div className="flex justify-center" ref={cartRef} style={{
            opacity: cartVisible ? 1 : 0,
            transform: cartVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}>
            <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border max-w-2xl w-full card-depth" style={{borderColor:"#eadfce"}}>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8" style={{background: "#fff4e6", border: `1px solid ${GOLD}40`}}>
                <ShoppingCart size={52} style={{ color: GOLD }} strokeWidth={2} />
              </div>
              <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: "clamp(30px,5vw,40px)", color: CHAR, marginBottom: 10, letterSpacing: 1 }}>Your Cart is Empty</h2>
              <p className="max-w-[42ch] mx-auto" style={{ fontFamily: "Inter, sans-serif", color: GREY, marginBottom: 32, fontSize: 16.5, lineHeight: 1.6 }}>Looks like you haven't added anything yet — start with our delicious wings.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/menu" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold uppercase tracking-[0.06em] text-white text-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:brightness-110" style={{
                  background: RED, fontFamily: "Inter, sans-serif"
                }}>
                  Browse Menu <ArrowRight size={16} />
                </Link>
                <Link to="/locations" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold uppercase tracking-[0.06em] text-sm border-2 transition hover:-translate-y-0.5 hover:shadow-lg" style={{
                  borderColor: "#eadfce", color: CHAR, fontFamily: "Inter, sans-serif"
                }}>
                  Find a Location
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2" ref={cartRef} style={{
              opacity: cartVisible ? 1 : 0,
              transform: cartVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}>
              <div className="bg-white rounded-3xl p-8 border-2" style={{borderColor:"#f0e0d0"}}>
                <div className="flex justify-between items-center pb-6 border-b" style={{borderColor:"#f0e0d0"}}>
                  <h2 className="flex items-center gap-2" style={{ fontFamily:"Anton, sans-serif", color:CHAR, fontSize:28, letterSpacing:1 }}><ShoppingCart size={24} /> My Cart</h2>
                  <span className="px-4 py-2 rounded-xl font-bold" style={{background: GOLD, color: CHAR, fontFamily:"Inter, sans-serif"}}>Confirm</span>
                </div>
                
                <div className="space-y-6 py-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center pb-6 border-b" style={{borderColor:"#f0e0d0"}}>
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Drumstick size={34} color={GOLD} strokeWidth={2} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 style={{
                          fontFamily: "Inter, sans-serif", fontSize:18, color: CHAR, fontWeight:800, marginBottom:4
                        }}>{item.name}</h3>
                        <p style={{
                          fontFamily: "Inter, sans-serif", color: GREY, fontSize:14, marginBottom:8
                        }}>{item.description}</p>
                        <p style={{
                          fontFamily: "Inter, sans-serif", color: "#9ca3af", fontSize:13
                        }}>Without cutlery</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{background: RED, color: "#fff"}}
                          >
                            <Minus size={18} />
                          </button>
                          <span style={{
                            fontFamily: "Anton, sans-serif", fontSize: 20, color: CHAR
                          }}>{item.quantity}x</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{background: RED, color: "#fff"}}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <span style={{
                          fontFamily: "Anton, sans-serif", fontSize:22, color: RED
                        }}>${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 items-center pt-4 border-t" style={{borderColor:"#f0e0d0"}}>
                  <button className="px-6 py-3 rounded-xl border-2 flex items-center gap-2 font-bold" style={{borderColor:GOLD, color: GOLD, fontFamily:"Inter, sans-serif"}}>
                    <Gift size={16} /> Add discount
                  </button>
                  <div className="ml-auto text-right">
                    <p style={{fontFamily:"Inter, sans-serif", color: GREY, fontSize:14}}>Subtotal</p>
                    <p style={{fontFamily:"Anton, sans-serif", color: CHAR, fontSize:20}}>${total.toFixed(2)}</p>
                    <p style={{fontFamily:"Inter, sans-serif", color: GREY, fontSize:14}}>Delivery fee</p>
                    <p style={{fontFamily:"Anton, sans-serif", color: CHAR, fontSize:20}}>$0.00</p>
                    <p style={{fontFamily:"Inter, sans-serif", color: GREY, fontSize:14}}>Discount</p>
                    <p style={{fontFamily:"Anton, sans-serif", color: "#10b981", fontSize:20}}>-$0.00</p>
                    <div className="border-t pt-2 mt-2" style={{borderColor:"#f0e0d0"}}>
                      <p style={{fontFamily:"Anton, sans-serif", color: CHAR, fontSize:24}}>TOTAL</p>
                      <p style={{fontFamily:"Anton, sans-serif", color: RED, fontSize:32}}>${(total * 1.08).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 sticky top-24 border-2" style={{borderColor:"#f0e0d0"}}>
                <h3 style={{
                  fontFamily: "Anton, sans-serif", fontSize:28, color: CHAR, marginBottom: 24, letterSpacing:1
                }}>Total Payment</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span style={{fontFamily: "Inter, sans-serif", color: GREY, fontSize:14}}>Subtotal</span>
                    <span style={{fontFamily: "Inter, sans-serif", color: CHAR, fontSize:14, fontWeight:700}}>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{fontFamily: "Inter, sans-serif", color: GREY, fontSize:14}}>Delivery fee</span>
                    <span style={{fontFamily: "Inter, sans-serif", color: CHAR, fontSize:14, fontWeight:700}}>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{fontFamily: "Inter, sans-serif", color: GREY, fontSize:14}}>Discount</span>
                    <span style={{fontFamily: "Inter, sans-serif", color: "#10b981", fontSize:14, fontWeight:700}}>-$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span style={{fontFamily: "Anton, sans-serif", color: CHAR, fontSize:20}}>Remaining amount</span>
                    <span style={{fontFamily: "Anton, sans-serif", color: RED, fontSize:28}}>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="block w-full text-center py-4 px-6 rounded-xl font-bold text-xl transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{
                  background: GOLD, color: CHAR, fontFamily: "Anton, sans-serif", letterSpacing:1
                }}>Send order</Link>
                <p style={{fontFamily:"Inter, sans-serif", color: GREY, fontSize:12, textAlign:"center", marginTop:16}}>
                  In the case of a group order, the delivery cost is paid individually and the balance is refunded based on the total amount.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
