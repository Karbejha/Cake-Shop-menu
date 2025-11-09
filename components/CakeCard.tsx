import React from 'react';
import type { Cake } from '../types';

const AddToCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

interface CakeCardProps {
  cake: Cake;
  onAddToCart: (cake: Cake) => void;
  onViewDetails: (cake: Cake) => void;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake, onAddToCart, onViewDetails }) => {
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(cake);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group no-underline"
      onClick={() => onViewDetails(cake)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onViewDetails(cake); }}
      aria-label={`View details for ${cake.name}`}
    >
      <div className="overflow-hidden">
        <img src={cake.imageUrl} alt={cake.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-rose-700">{cake.name}</h3>
        <p className="text-stone-600 mt-2 text-sm flex-grow">{cake.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-stone-800">${cake.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCartClick}
            aria-label={`Add ${cake.name} to cart`}
            className="flex items-center bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-75 z-10"
          >
            <AddToCartIcon />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;