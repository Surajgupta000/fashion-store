import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/arrivals" element={<Arrivals />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/exclusive" element={<Exclusive />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;