import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Shop from "./pages/Shop";
import Arrivals from "./pages/Arrivals";
import Wishlist from "./pages/Wishlist";
import GalleryPage from "./pages/Gallery";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./pages/Checkout";
import Exclusive from "./pages/Exclusive";
import ProductDetails from "./pages/ProductDetails";
import AdminGatekeeper from "./pages/AdminGatekeeper";

// 💡 Helper to reset scroll position on page change (Essential for Mobile)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      {/* ScrollToTop must be inside BrowserRouter */}
      <ScrollToTop />
      
      {/* MAIN WRAPPER 
        'min-h-screen' ensures footer stays at bottom on empty pages
        'overflow-x-hidden' is the ultimate safety net for mobile responsiveness
      */}
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#F9F9F9]">
        <Navbar />
        <CartDrawer />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/arrivals" element={<Arrivals />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/exclusive" element={<Exclusive />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/admin-dashboard" element={<AdminGatekeeper />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;