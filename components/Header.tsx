import React from 'react';

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    view: 'shop' | 'admin';
    onViewChange: (view: 'shop' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, view, onViewChange }) => {
    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-30">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img 
                        src="https://i.ibb.co/MyQpM5SZ/Gemini-Generated-Image-rao6hjrao6hjrao6-removebg-preview.png"
                        alt="The Cake Corner Logo"
                        className="h-14 w-auto"
                    />
                    <div>
                        <span className="dancing-script text-2xl font-bold text-rose-800">karbejha</span>
                        <p className="text-xs text-stone-500 -mt-1 tracking-wider">Cake with love</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onViewChange(view === 'shop' ? 'admin' : 'shop')}
                        className="text-sm text-stone-600 hover:text-rose-600 transition-colors font-medium"
                    >
                        {view === 'shop' ? 'Admin Panel' : 'Back to Shop'}
                    </button>
                    <button 
                        onClick={onCartClick}
                        className="relative text-stone-600 hover:text-rose-600 transition-colors"
                        aria-label="Open shopping cart"
                    >
                        <ShoppingCartIcon />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;