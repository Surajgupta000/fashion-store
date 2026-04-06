import { useNavigate } from "react-router-dom";
import anarkaliImage from "../assets/lehenga4.jpg";

export default function InfoSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-16 max-w-7xl mx-auto bg-[var(--color-bg-light)] rounded-3xl">

      {/* LEFT TEXT */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Style That Speaks Elegance
        </h2>

        <p className="text-gray-600 mb-6">
          Discover handpicked collections crafted for modern women.
        </p>

        <button
          onClick={() => navigate("/exclusive")}
          className="btn-accent"
        >
          Catch it now →
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1">
        <img
          src={anarkaliImage}
          className="rounded-2xl w-full h-[400px] object-cover"
        />
      </div>

    </div>
  );
}