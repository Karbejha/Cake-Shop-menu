import React, { useState } from 'react';
import type { Cake } from '../types';
import CakeForm from './CakeForm';

interface AdminPanelProps {
    cakes: Cake[];
    onAddCake: (cake: Omit<Cake, 'id'>) => void;
    onUpdateCake: (cake: Cake) => void;
    onDeleteCake: (id: number) => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

const AdminPanel: React.FC<AdminPanelProps> = ({ cakes, onAddCake, onUpdateCake, onDeleteCake }) => {
    const [editingCake, setEditingCake] = useState<Cake | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleEdit = (cake: Cake) => {
        setIsAdding(false);
        setEditingCake(cake);
        window.scrollTo(0, 0);
    };

    const handleAddNew = () => {
        setEditingCake(null);
        setIsAdding(true);
        window.scrollTo(0, 0);
    };

    const handleCancel = () => {
        setEditingCake(null);
        setIsAdding(false);
    };

    const handleSave = (cakeData: Omit<Cake, 'id'> | Cake) => {
        if ('id' in cakeData) {
            onUpdateCake(cakeData);
        } else {
            onAddCake(cakeData);
        }
        setEditingCake(null);
        setIsAdding(false);
    };

    if (isAdding || editingCake) {
        return (
            <CakeForm 
                cake={editingCake} 
                onSave={handleSave} 
                onCancel={handleCancel} 
            />
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-rose-800">Manage Cakes</h1>
                <button onClick={handleAddNew} className="flex items-center bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
                    <PlusIcon />
                    Add New Cake
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Price</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                        {cakes.map((cake) => (
                            <tr key={cake.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-stone-900">{cake.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-stone-900">${cake.price.toFixed(2)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => handleEdit(cake)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => onDeleteCake(cake.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
