import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;