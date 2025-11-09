import React, { useState, useEffect } from 'react';
import type { Cake } from '../types';

interface CakeFormProps {
    cake?: Cake | null;
    onSave: (cake: Omit<Cake, 'id'> | Cake) => void;
    onCancel: () => void;
}

interface FormState {
    name: string;
    description: string;
    longDescription: string;
    price: string;
    imageUrl: string;
}

const getInitialState = (cake: Cake | null | undefined): FormState => {
    if (cake) {
        return { ...cake, price: String(cake.price) };
    }
    return { name: '', description: '', longDescription: '', price: '', imageUrl: '' };
}


const CakeForm: React.FC<CakeFormProps> = ({ cake, onSave, onCancel }) => {
    const [formData, setFormData] = useState<FormState>(getInitialState(cake));

    useEffect(() => {
        setFormData(getInitialState(cake));
    }, [cake]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageUrl: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert('Please upload an image for the cake.');
            return;
        }
        const priceAsNumber = parseFloat(formData.price) || 0;
        const cakeDataToSave = { ...formData, price: priceAsNumber };

        if (cake) {
            onSave({ ...cakeDataToSave, id: cake.id });
        } else {
            onSave(cakeDataToSave);
        }
    };

    const formTitle = cake ? 'Edit Cake' : 'Add New Cake';

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fade-in">
            <h2 className="text-2xl font-bold text-rose-800 mb-6">{formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">Cake Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-stone-700">Short Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={2}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    />
                </div>

                <div>
                    <label htmlFor="longDescription" className="block text-sm font-medium text-stone-700">Long Description</label>
                    <textarea
                        name="longDescription"
                        id="longDescription"
                        value={formData.longDescription}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-stone-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                        placeholder="e.g., 25.99"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700">Cake Image</label>
                    <div className="mt-2 flex items-center gap-4">
                        {formData.imageUrl && <img src={formData.imageUrl} alt="Cake preview" className="w-24 h-24 object-cover rounded-md" />}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-stone-200 text-stone-800 px-4 py-2 rounded-lg hover:bg-stone-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
                    >
                        Save Cake
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CakeForm;