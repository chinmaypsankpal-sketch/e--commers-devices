import React from 'react';
import { User, CartItem } from '../types';
import { STORE_NAME } from '../constants';

interface NavbarProps {
  user: User | null;
  cartItems: CartItem[];
  onCartClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onLogoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  cartItems, 
  onCartClick, 
  onLoginClick, 
  onLogoutClick,
  onLogoClick
}) => {
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={onLogoClick}
          >
            <i className="fa-solid fa-bolt text-primary text-2xl mr-2"></i>
            <span className="font-bold text-xl tracking-tight text-secondary">
              {STORE_NAME}
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            
            {/* User Auth */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={onLogoutClick}
                  className="text-gray-500 hover:text-red-600 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Login
              </button>
            )}

            {/* Cart Icon */}
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
