import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import SmoothScroll from "../components/anim/SmoothScroll";
import ScrollProgress from "../components/anim/ScrollProgress";
import PageTransition from "../components/anim/PageTransition";
import CartFly from "../components/anim/CartFly";
import Preloader from "../components/anim/Preloader";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import LocationsPage from "../pages/LocationsPage";
import AboutPage from "../pages/AboutPage";
import CareerPage from "../pages/CareerPage";
import CateringPage from "../pages/CateringPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrderTrackingPage from "../pages/OrderTrackingPage";
import AuthPage from "../pages/AuthPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";
import NotFoundPage from "../pages/NotFoundPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><MenuPage /></PageTransition>} />
        <Route path="/locations" element={<PageTransition><LocationsPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/career" element={<PageTransition><CareerPage /></PageTransition>} />
        <Route path="/catering" element={<PageTransition><CateringPage /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/order-tracking" element={<PageTransition><OrderTrackingPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <SmoothScroll>
        <ScrollProgress />
        <CartFly />
        <Nav />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}
