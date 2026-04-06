export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-text-light)] px-6 py-10 mt-10">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Fashion Store</h2>
          <p className="text-gray-400">
            Discover latest trends in sarees, lehengas, suits and more.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Shop</li>
            <li>Categories</li>
            <li>Arrivals</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">📞 +91 XXXXXXXX</p>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            className="inline-block mt-3 bg-green-500 px-4 py-2 rounded-full"
          >
            WhatsApp
          </a>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © 2026 Fashion Store
      </div>

    </footer>
  );
}