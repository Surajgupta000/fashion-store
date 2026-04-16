import { FiInstagram, FiPhone, FiMapPin, FiCreditCard, FiHeart } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';

  return (
    <footer className={`bg-[#0F0F0F] text-[#EADFD6] px-6 pt-16 mt-10 font-light ${isCheckout ? 'pb-32 lg:pb-16' : 'pb-16'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Column 1: Brand Essence */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-serif tracking-widest uppercase mb-2">Arinya Shree</h2>
            <p className="text-xs tracking-[0.15em] text-gray-500 uppercase">House of Exclusive Elegance</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Celebrating the art of slow fashion with hand-curated sarees,
            silks, and couture designed for the discerning soul.
          </p>
          <div className="flex space-x-5 items-center">
            <a href="#" className="hover:text-white transition-colors">
              <FiInstagram size={20} strokeWidth={1.5} />
            </a>
            <a href="tel:+918777382510" className="hover:text-white transition-colors">
              <FiPhone size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Column 2: The Collections */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white">Collections</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Exclusive Fancy Sarees</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Heritage Silk Lane</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Couture Lehengas & Gowns</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Designer Kurtis & Suits</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Bespoke Menswear</li>
          </ul>
        </div>

        {/* Column 3: Client Care */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white">Experience</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Our Heritage</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Shipping & Returns</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-[#EADFD6] cursor-pointer transition-colors">Terms of Service</li>
          </ul>
        </div>

        {/* Column 4: The Atelier (Contact) */}
        <div className="space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-4 text-white">Visit Us</h3>
          <div className="text-sm text-gray-400 flex items-start gap-3">
            <FiMapPin size={18} className="mt-1 flex-shrink-0" />
            <p>185, M.G. Road, Ground Floor,<br />Kolkata - 700 001</p>
          </div>
          <div className="text-xs text-gray-500 font-mono tracking-tighter">
            GSTIN: 19ACLFA1085E1ZF
          </div>
          <a
            href="https://wa.me/918777382510"
            target="_blank"
            className="inline-block border border-[#EADFD6] px-6 py-2 text-xs uppercase tracking-widest hover:bg-[#EADFD6] hover:text-black transition-all duration-500"
          >
            WhatsApp Inquiry
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-gray-600">
        <p>© 2026 ARINYA SHREE. ALL RIGHTS RESERVED.</p>
        <div className="mt-4 md:mt-0 flex flex-col items-center gap-2 opacity-50">
          <div className="flex items-center gap-2 uppercase">
            MADE WITH <FiHeart size={12} className="text-red-500 fill-red-500" />
          </div>
          <div className="flex gap-4 grayscale">
            {/* Subtle mention of slow fashion values */}
            <span>ETHICALLY CURATED</span>
            <span>•</span>
            <span>HANDCRAFTED IN INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}