import { useState } from "react";
import favicon4 from "../../assets/favicon4.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context"; 
import { useWishlist } from "../../context/wishlist-context"; 
import { SearchBar } from "../SearchBar";

export const Navbar = ({ searchData = [], onSearch = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get cart and wishlist state
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="bg-orange-400 text-neutral-50 z-50 fixed top-0 left-0 w-full shadow-lg">
      {/* Main Container */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6 gap-4">
        
        {/* Brand */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <img src={favicon4} alt="shopify.com" className="h-8 w-8 md:h-10 md:w-10" />
          <h1 className="text-2xl md:text-3xl font-bold">Shopify</h1>
        </div>

        {/* Search Bar - Center Position */}
        <div className="flex-1 flex justify-center max-w-lg">
          <SearchBar data={searchData} onSearch={onSearch} />
        </div>

        {/* Desktop Nav (Hidden on Mobile) */}
        <nav className="hidden md:flex gap-12 items-center">
          <NavIcon 
            icon="home" 
            label="Home" 
            to="/" 
            navigate={navigate} 
          />
          <NavIcon 
            icon="shopping_cart" 
            label="Cart" 
            to="/cart" 
            navigate={navigate} 
            badgeCount={cart?.length} // Pass cart count
          />
          <NavIcon 
            icon="favorite" 
            label="Wishlist" 
            to="/wishlist" 
            navigate={navigate} 
            badgeCount={wishlist?.length} // Pass wishlist count
          />
          <NavIcon 
            icon="account_circle" 
            label="Profile" 
            to="/profile" 
            navigate={navigate} 
          />
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
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-orange-500 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"
        }`}
      >
        <div className="flex flex-col py-4">
          <MobileNavItem 
            icon="home" 
            label="Home" 
            to="/" 
            navigate={navigate} 
          />
          <MobileNavItem 
            icon="shopping_cart" 
            label="Cart" 
            to="/cart" 
            navigate={navigate} 
            badgeCount={cart?.length} // Pass cart count
          />
          <MobileNavItem 
            icon="favorite" 
            label="Wishlist" 
            to="/wishlist" 
            navigate={navigate} 
            badgeCount={wishlist?.length} // Pass wishlist count
          />
          <MobileNavItem 
            icon="account_circle" 
            label="My Account" 
            to="/profile" 
            navigate={navigate} 
          />
        </div>
      </div>
    </header>
  );
};

// Sub-component for Desktop Icons with Badge Logic
const NavIcon = ({ icon, label, to, navigate, badgeCount }) => (
  <button 
    className="group relative flex flex-col items-center" 
    title={label}
    onClick={() => navigate(to)}
  >
    <span className="material-icons-outlined text-3xl group-hover:text-yellow-400 transition-colors">
      {icon}
    </span>
    {/* Desktop Badge: Absolute positioned top-right */}
    {badgeCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] flex items-center justify-center border-2 border-orange-400">
        {badgeCount}
      </span>
    )}
  </button>
);

// Sub-component for Mobile Menu Items with Badge Logic
const MobileNavItem = ({ icon, label, to, navigate, badgeCount }) => (
  <button
    onClick={() => navigate(to)}
    className="flex items-center gap-4 px-8 py-4 hover:bg-orange-600 border-b border-orange-400 last:border-0 transition-colors w-full text-left"
  >
    <span className="material-icons-outlined text-2xl">{icon}</span>
    <span className="text-lg font-medium">{label}</span>
    
    {/* Mobile Badge: Inline next to the text */}
    {badgeCount > 0 && (
      <span className="ml-2 bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
        {badgeCount}
      </span>
    )}
  </button>
);