import React, { useState } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = categoryFilter === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === categoryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Filters */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500 hidden sm:block">
          {filteredProducts.length} Products Found
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden bg-gray-100 group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                 <span className="text-xs font-bold text-yellow-500">
                   <i className="fa-solid fa-star mr-1"></i>{product.rating}
                 </span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-primary hover:bg-indigo-700 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-md active:scale-95"
                  title="Add to Cart"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
