import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { RED, CHAR, GREY, GOLD, CREAM } from "../constants/brand";
import { useCart } from "../contexts/CartContext";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");

  const handlePayNow = () => {
    clearCart();
    navigate("/order-tracking?order=BLAZIN-" + Math.floor(Math.random() * 10000));
  };

  const tax = total * 0.18;
  const grandTotal = total + tax;

  return (
    <div style={{ background: CREAM, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Header - Matching Image 1 Style */}
      <div className="pt-24 pb-12 text-center" style={{ background: "#1C1412" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mb-8">
          </div>
          <h1 style={{
            fontFamily: "Anton, sans-serif",
            fontSize: 64,
            color: "#fff",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}>CHECKOUT</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column: Form - Matching Image 2 Style */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Contact */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-2xl font-bold" style={{ color: CHAR }}>Contact</h2>
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-4 border rounded-lg focus:outline-none transition-all"
                style={{ background: "#FFFBF7", borderColor: "#E5E1DA", color: CHAR }}
              />
            </section>

            {/* Delivery */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold mb-4" style={{ color: CHAR }}>Delivery</h2>
              
              <div className="relative">
                <select className="w-full p-4 border rounded-lg appearance-none focus:outline-none transition-all bg-white"
                  style={{ borderColor: "#E5E1DA", color: CHAR }}
                >
                  <option>Pakistan</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={18} style={{ color: GREY }} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First name (optional)" className="p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />
                <input type="text" placeholder="Last name" className="p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />
              </div>

              <input type="text" placeholder="Address" className="w-full p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />
              
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />

              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" className="p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />
                <input type="text" placeholder="Postal code (optional)" className="p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />
              </div>

              <input type="tel" placeholder="Phone" className="w-full p-4 border rounded-lg focus:outline-none" style={{ borderColor: "#E5E1DA" }} />
            </section>

            {/* Shipping Method */}
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: CHAR }}>Shipping method</h2>
              <div className="p-4 border rounded-lg flex justify-between items-center" style={{ borderColor: GOLD, background: `${GOLD}10` }}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" checked readOnly className="w-4 h-4" style={{ accentColor: RED }} />
                  <span className="text-sm font-medium uppercase tracking-wider" style={{ color: CHAR }}>Free Shipping</span>
                </label>
                <span className="text-sm font-bold" style={{ color: CHAR }}>FREE</span>
              </div>
            </section>

            {/* Payment */}
            <section className="space-y-4">
              <div className="mb-4">
                <h2 className="text-2xl font-bold" style={{ color: CHAR }}>Payment</h2>
                <p className="text-xs mt-1" style={{ color: GREY }}>All transactions are secure and encrypted.</p>
              </div>

              <div className="border rounded-xl overflow-hidden" style={{ borderColor: GOLD }}>
                <div className="p-4 border-b" style={{ background: `${GOLD}10`, borderColor: GOLD }}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="radio" name="payment" checked readOnly className="mt-1 w-4 h-4" style={{ accentColor: RED }} />
                    <div>
                      <span className="text-sm font-medium" style={{ color: CHAR }}>PAYFAST / Debit / Credit / Wallet / Bank Account</span>
                      <p className="text-xs mt-1" style={{ color: GREY }}>You'll be redirected to PAYFAST to complete your purchase.</p>
                    </div>
                  </label>
                </div>
                <div className="p-4 bg-white border-b" style={{ borderColor: "#E5E1DA" }}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4" style={{ accentColor: RED }} />
                    <span className="text-sm" style={{ color: CHAR }}>Cash on Delivery (COD)</span>
                  </label>
                </div>
                <div className="p-4 bg-white">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4" style={{ accentColor: RED }} />
                    <span className="text-sm" style={{ color: CHAR }}>Bank Deposit</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-between items-center pt-8 border-t" style={{ borderColor: "#E5E1DA" }}>
              <Link to="/cart" className="flex items-center gap-2 text-sm transition-colors" style={{ color: GREY }}>
                <ArrowLeft size={16} /> Back to cart
              </Link>
              <button 
                onClick={handlePayNow}
                className="px-12 py-4 text-white text-sm font-bold uppercase tracking-widest transition-all rounded-sm shadow-xl hover:brightness-110"
                style={{ background: "#1C1412" }}
              >
                PAY NOW
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl sticky top-24 space-y-6 shadow-sm border" style={{ background: "#fff", borderColor: "#E5E1DA" }}>
              <h2 className="text-xl font-bold" style={{ color: CHAR }}>Order Summary</h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-white border rounded-lg overflow-hidden flex-shrink-0" style={{ borderColor: "#E5E1DA" }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🍗</div>
                      )}
                      <div className="absolute -top-1 -right-1 w-6 h-6 text-white text-[10px] flex items-center justify-center rounded-full font-bold" style={{ background: "#1C1412" }}>
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold" style={{ color: CHAR }}>{item.name}</h3>
                    </div>
                    <div className="text-sm font-bold" style={{ color: CHAR }}>
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-6 border-t" style={{ borderColor: "#E5E1DA" }}>
                <input 
                  type="text" 
                  placeholder="Discount code" 
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 p-3 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: "#E5E1DA" }}
                />
                <button className="px-6 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors hover:brightness-110" style={{ background: CHAR }}>
                  APPLY
                </button>
              </div>

              <div className="space-y-4 pt-6 text-sm">
                <div className="flex justify-between" style={{ color: GREY }}>
                  <span>Subtotal</span>
                  <span className="font-bold" style={{ color: CHAR }}>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" style={{ color: GREY }}>
                  <span>Tax (18%)</span>
                  <span className="font-bold" style={{ color: CHAR }}>Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" style={{ color: GREY }}>
                  <span>Shipping</span>
                  <span className="font-bold" style={{ color: CHAR }}>FREE</span>
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t text-xl" style={{ borderColor: "#E5E1DA" }}>
                <span className="font-bold" style={{ color: CHAR }}>Total</span>
                <div className="text-right">
                  <span className="text-xs block mb-1" style={{ color: GREY }}>PKR</span>
                  <span className="font-anton text-3xl" style={{ color: RED }}>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${CREAM};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E1DA;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${GREY};
        }
        .font-anton {
          font-family: 'Anton', sans-serif;
        }
      `}} />
    </div>
  );
}
