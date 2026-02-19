import { useState } from "react";
import favicon4 from "../../assets/favicon4.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";
import { useAuth } from "../../context/auth-context";
import { SearchBar } from "../SearchBar";

export const Navbar = ({ searchData = [], onSearch = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Contexts
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth(); // Get auth state

  return (
    <header className="bg-orange-400 text-neutral-50 relative z-50">
      {/* Main Container */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4 md:py-6 gap-4">
        {/* Brand */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <img
            src={favicon4}
            alt="shopify.com"
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <h1 className="text-2xl md:text-3xl font-bold hidden sm:block">
            Shopify
          </h1>
        </div>

        {/* Search Bar - Center Position */}
        <div className="flex-1 flex justify-center max-w-lg">
          <SearchBar data={searchData} onSearch={onSearch} />
        </div>

        {/* Desktop Nav (Hidden on Mobile) */}
        <nav className="hidden md:flex gap-8 items-center shrink-0">
          <NavIcon
            icon="shopping_cart"
            label="Cart"
            to="/cart"
            navigate={navigate}
            badgeCount={cart?.length}
          />
          <NavIcon
            icon="favorite"
            label="Wishlist"
            to="/wishlist"
            navigate={navigate}
            badgeCount={wishlist?.length}
          />

          {/* Auth Button Logic */}
          {user ? (
            <button
              onClick={logout}
              className="group relative flex flex-col items-center"
              title="Logout"
            >
              <span className="material-icons-outlined text-3xl group-hover:text-red-600 transition-colors">
                logout
              </span>
            </button>
          ) : (
            <NavIcon
              icon="account_circle"
              label="Login"
              to="/login"
              navigate={navigate}
            />
          )}
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden flex items-center p-2 focus:outline-none shrink-0"
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
            icon="shopping_cart"
            label="Cart"
            to="/cart"
            navigate={navigate}
            badgeCount={cart?.length}
          />
          <MobileNavItem
            icon="favorite"
            label="Wishlist"
            to="/wishlist"
            navigate={navigate}
            badgeCount={wishlist?.length}
          />

          {/* Mobile Auth Button Logic */}
          {user ? (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-4 px-8 py-4 hover:bg-orange-600 border-b border-orange-400 last:border-0 transition-colors w-full text-left"
            >
              <span className="material-icons-outlined text-2xl">logout</span>
              <span className="text-lg font-medium">Logout</span>
            </button>
          ) : (
            <MobileNavItem
              icon="account_circle"
              label="Login"
              to="/login"
              navigate={navigate}
            />
          )}
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
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] flex items-center justify-center border-2 border-orange-400">
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
