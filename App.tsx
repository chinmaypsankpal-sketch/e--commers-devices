import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { AIChatBot } from './components/AIChatBot';
import { Product, CartItem, User } from './types';

function App() {
  const [view, setView] = useState<'home' | 'checkout' | 'success'>('home');
  // Set default to true to show Front Login Page
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate cart total
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Cart Actions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Auth Actions
  const handleLogin = (name: string, email: string) => {
    setUser({ name, email });
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    // Optional: Re-open login page on logout? 
    // setIsLoginOpen(true); 
  };

  // View Navigation
  const goToCheckout = () => {
    if (cart.length === 0) return;
    if (!user) {
      setIsCartOpen(false);
      setIsLoginOpen(true);
      return;
    }
    setIsCartOpen(false);
    setView('checkout');
  };

  const handlePurchaseComplete = () => {
    clearCart();
    setView('success');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar 
        user={user}
        cartItems={cart}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={handleLogout}
        onLogoClick={() => setView('home')}
      />

      {/* Main Content Area */}
      <main className="pt-4">
        {view === 'home' && (
          <>
             {/* Hero Section */}
             <div className="bg-secondary text-white py-12 px-4 sm:px-6 lg:px-8 mb-8">
               <div className="max-w-7xl mx-auto text-center">
                 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                   Future Tech, <span className="text-primary">Today.</span>
                 </h1>
                 <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                   Discover the latest in high-performance electronics. Curated gadgets for the modern lifestyle.
                 </p>
               </div>
             </div>
             
             <ProductList onAddToCart={addToCart} />
          </>
        )}

        {view === 'checkout' && (
          <Checkout 
            items={cart} 
            total={cartTotal} 
            onConfirm={handlePurchaseComplete}
            onCancel={() => setView('home')}
          />
        )}

        {view === 'success' && (
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <i className="fa-solid fa-check text-4xl text-green-600"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Thank you for shopping with ElectroTech, {user?.name}. Your order has been confirmed and will be shipped shortly.
            </p>
            <button 
              onClick={() => setView('home')}
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={goToCheckout}
      />

      {isLoginOpen && (
        <Login 
          onLogin={handleLogin} 
          onCancel={() => setIsLoginOpen(false)} 
        />
      )}

      {/* Chat Widget */}
      <AIChatBot />

    </div>
  );
}

export default App;