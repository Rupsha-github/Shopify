import { useState } from "react";
import favicon4 from "../../assets/favicon4.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-orange-400 text-neutral-50 relative z-50">
      {/* Main Container */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6">
        
        {/* Brand */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <img src={favicon4} alt="shopify.com" className="h-8 w-8 md:h-10 md:w-10" />
          <h1 className="text-2xl md:text-3xl font-bold">Shopify</h1>
        </div>

        {/* Desktop Nav (Hidden on Mobile) */}
        <nav className="hidden md:flex gap-8 items-center">
          <NavIcon icon="shopping_cart" label="Cart" />
          <NavIcon icon="favorite" label="Wishlist" />
          <NavIcon icon="account_circle" label="Profile" />
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          className="md:hidden flex items-center p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-icons-outlined text-3xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {/* This renders conditionally based on isOpen state */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-orange-500 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"
        }`}
      >
        <div className="flex flex-col py-4">
          <MobileNavItem icon="shopping_cart" label="Cart" />
          <MobileNavItem icon="favorite" label="Wishlist" />
          <MobileNavItem icon="account_circle" label="My Account" />
        </div>
      </div>
    </header>
  );
};

// Sub-component for Desktop Icons to reduce repetition
const NavIcon = ({ icon, label }) => (
  <button 
    className="group relative flex flex-col items-center" 
    title={label}
  >
    <span className="material-icons-outlined text-3xl group-hover:text-yellow-400 transition-colors">
      {icon}
    </span>
  </button>
);

// Sub-component for Mobile Menu Items
const MobileNavItem = ({ icon, label }) => (
  <a 
    href="#" 
    className="flex items-center gap-4 px-8 py-4 hover:bg-orange-600 border-b border-orange-400 last:border-0 transition-colors"
  >
    <span className="material-icons-outlined text-2xl">{icon}</span>
    <span className="text-lg font-medium">{label}</span>
  </a>
);