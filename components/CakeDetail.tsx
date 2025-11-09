import React from 'react';
import type { Cake } from '../types';

const AddToCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

interface CakeDetailProps {
  cake: Cake;
  onBack: () => void;
  onAddToCart: (cake: Cake) => void;
}

const CakeDetail: React.FC<CakeDetailProps> = ({ cake, onBack, onAddToCart }) => {
  return (
    <div className="animate-fade-in">
        <button onClick={onBack} className="flex items-center text-rose-600 hover:text-rose-800 font-semibold mb-6 transition-colors">
            <BackArrowIcon />
            Back to Menu
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
                <img src={cake.imageUrl.replace('/400/300', '/800/600')} alt={cake.name} className="w-full h-auto object-cover rounded-lg shadow-xl"/>
            </div>
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold text-rose-800 dancing-script">{cake.name}</h1>
                <p className="text-stone-600 mt-4 text-lg leading-relaxed">
                    {cake.longDescription}
                </p>
                <div className="mt-8 flex justify-between items-center">
                    <span className="text-3xl font-bold text-stone-800">${cake.price.toFixed(2)}</span>
                    <button 
                        onClick={() => onAddToCart(cake)}
                        className="flex items-center bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors duration-300 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-75"
                    >
                        <AddToCartIcon />
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CakeDetail;