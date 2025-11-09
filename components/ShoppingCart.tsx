import React, { useMemo } from 'react';
import type { CartItem } from '../types';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);
const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
    </svg>
);

const EmptyCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);


interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (cakeId: number) => void;
    // FIX: Update onAddItem to expect a CartItem, which is what is available in this component.
    onAddItem: (item: CartItem) => void;
    onDecrementItem: (cakeId: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onAddItem, onDecrementItem }) => {
    
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }, [cartItems]);

    const handleCheckout = () => {
        alert(`Thank you for your order! Your total is $${totalPrice}.`);
    };

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={onClose} 
            />
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-rose-800">Your Cart</h2>
                        <button onClick={onClose} className="text-stone-500 hover:text-rose-600 transition-colors">
                            <XIcon />
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                            <EmptyCartIcon />
                            <p className="text-lg font-semibold text-stone-600 mt-6">Your Cart is Empty</p>
                            <p className="text-sm text-stone-500 mt-1">Looks like you haven't added any cakes yet.</p>
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-start space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-stone-800">{item.name}</h3>
                                        <p className="text-sm text-stone-500">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => onDecrementItem(item.id)} className="border rounded-full p-1 hover:bg-stone-100">
                                                <MinusIcon />
                                            </button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button onClick={() => onAddItem(item)} className="border rounded-full p-1 hover:bg-stone-100">
                                                <PlusIcon />
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-sm">
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <div className="p-4 border-t mt-auto">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold text-stone-700">Total</span>
                                <span className="text-xl font-bold text-rose-800">${totalPrice}</span>
                            </div>
                            <button 
                                onClick={handleCheckout}
                                className="w-full bg-rose-500 text-white py-3 rounded-lg font-bold hover:bg-rose-600 active:bg-rose-700 transition-colors duration-300"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ShoppingCart;