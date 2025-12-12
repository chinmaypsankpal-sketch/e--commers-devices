import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, total, onConfirm, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate network delay
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        
        {/* Order Summary */}
        <div className="mt-10 lg:mt-0 lg:col-start-2">
           <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-4">
                  <div className="h-10 w-10 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1 flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{item.name} x {item.quantity}</span>
                    <span className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
           </div>
        </div>

        {/* Form */}
        <div className="mt-10 lg:mt-0 lg:col-start-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                   <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
               <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
               <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry</label>
                      <input required type="text" placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CVC</label>
                      <input required type="text" placeholder="123" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                    </div>
                 </div>
               </div>
            </div>

            <div className="flex gap-4">
               <button
                type="button"
                onClick={onCancel}
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                disabled={isProcessing}
              >
                Back to Shop
              </button>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Processing
                  </>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
