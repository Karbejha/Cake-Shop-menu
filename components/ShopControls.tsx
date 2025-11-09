import React from 'react';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface ShopControlsProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    sortBy: string;
    onSortChange: (criteria: string) => void;
}

const ShopControls: React.FC<ShopControlsProps> = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="relative w-full sm:w-auto sm:flex-grow max-w-sm">
                <input
                    type="text"
                    placeholder="Search for a cake..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-full focus:ring-rose-500 focus:border-rose-500 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-medium text-stone-600">Sort by:</label>
                <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="pl-3 pr-8 py-2 border border-stone-300 rounded-full bg-white text-sm focus:ring-rose-500 focus:border-rose-500 transition-colors"
                >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
        </div>
    );
};

export default ShopControls;