import React, { useState, useMemo, useEffect } from 'react';
import type { Cake, CartItem } from './types';
import Header from './components/Header';
import CakeCard from './components/CakeCard';
import CakeDetail from './components/CakeDetail';
import ShoppingCart from './components/ShoppingCart';
import AdminPanel from './components/AdminPanel';
import ShopControls from './components/ShopControls';

const initialCakes: Cake[] = [
  {
    id: 1,
    name: 'Velvet Dream',
    description: 'A rich red velvet cake with a smooth cream cheese frosting.',
    longDescription: 'Indulge in our signature Velvet Dream cake. Layers of moist, scarlet-hued red velvet sponge are perfectly balanced with a luxurious, tangy cream cheese frosting. A classic reborn, perfect for any celebration.',
    price: 24.99,
    imageUrl: 'https://bakeido.com/cdn/shop/files/Bakeido_Redvelvet_Cake_4_cd5dd747-6c02-44f0-ad6b-267f2ed80afd.jpg?v=1722530072',
  },
  {
    id: 2,
    name: 'Chocolate Decadence',
    description: 'An intense dark chocolate cake for the true chocoholic.',
    longDescription: 'Experience pure chocolate bliss with our Chocolate Decadence. This cake features a deep, dark chocolate sponge, a silky chocolate ganache filling, and is enrobed in a glossy chocolate glaze. It\'s a truly unforgettable experience for any chocolate lover.',
    price: 28.50,
    imageUrl: 'https://www.eatwicked.com/wp-content/uploads/2025/02/eat-wicked-cakes-sin-desserts-035.jpg',
  },
  {
    id: 3,
    name: 'Lemon Zest Delight',
    description: 'A light and fluffy lemon cake with a tangy lemon glaze.',
    longDescription: 'Brighten your day with our Lemon Zest Delight. This cake is made with fresh lemons, giving it a wonderfully fragrant and zesty flavor. The light sponge is soaked in a lemon syrup and topped with a sweet and tangy glaze.',
    price: 22.00,
    imageUrl: 'https://trivandrumcakehouse.com/wp-content/uploads/2019/11/Lemon-delight-cake-.jpeg',
  },
  {
    id: 4,
    name: 'Strawberry Shortcake',
    description: 'Classic vanilla sponge layered with fresh strawberries and cream.',
    longDescription: 'A timeless classic, our Strawberry Shortcake is the epitome of summer. Fluffy vanilla sponge cake is layered with freshly whipped cream and sweet, juicy strawberries. It\'s simple, elegant, and utterly delicious.',
    price: 26.75,
    imageUrl: 'https://www.piesandtacos.com/wp-content/uploads/2024/02/Strawberry-Shortcake-Cake-10-scaled.jpg',
  },
  {
    id: 5,
    name: 'Carrot Patch Classic',
    description: 'A moist carrot cake packed with nuts and spices, topped with cream cheese frosting.',
    longDescription: 'Our Carrot Patch Classic is a fan favorite for a reason. This incredibly moist cake is packed with grated carrots, crunchy walnuts, and a perfect blend of warm spices. It\'s all topped off with our signature, not-too-sweet cream cheese frosting.',
    price: 25.00,
    imageUrl: 'https://www.bakewithstork.com/-/media/Project/Upfield/Whitelabels/Bake-With-Stork-UK/Assets/Recipes/Sync-Recipes/6f622117-ac83-4823-a582-269978cfbf97.jpg?rev=1c3fa86954d7410c9132e5c391f13d24&w=1600',
  },
  {
    id: 6,
    name: 'Coconut Cream Cloud',
    description: 'A dreamy coconut cake with a light coconut cream filling.',
    longDescription: 'Float away on our Coconut Cream Cloud cake. This delicate cake features layers of coconut-infused sponge, a light and airy coconut cream filling, and is covered in toasted coconut flakes. A tropical paradise in every bite.',
    price: 27.00,
    imageUrl: 'https://yeyfood.com/wp-content/uploads/2025/08/WEB1A_close-up_view_of_a_slice_of_coconut_cloud_cake.__6c6090c3-2537-4be0-86fb-7c1b34b154ea_3.jpg',
  },
];

const CART_STORAGE_KEY = 'cake-shop-cart';

function loadCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Could not load cart from local storage", error);
    return [];
  }
}

const App: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>(initialCakes);
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [view, setView] = useState<'shop' | 'admin'>('shop');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to local storage", error);
    }
  }, [cartItems]);

  const handleAddToCart = (cake: Cake) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === cake.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { id: cake.id, name: cake.name, price: cake.price, imageUrl: cake.imageUrl, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (cakeId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== cakeId));
  };
  
  const handleDecrementItem = (cakeId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === cakeId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === cakeId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevItems.filter(item => item.id !== cakeId);
    });
  };

  const handleAddItem = (item: CartItem) => {
    setCartItems(prevItems => {
        return prevItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
    });
  };

  const handleViewDetails = (cake: Cake) => {
    setSelectedCake(cake);
  };

  const handleBackToShop = () => {
    setSelectedCake(null);
  };

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const filteredAndSortedCakes = useMemo(() => {
    let result = cakes.filter(cake =>
      cake.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [sortKey, sortOrder] = sortBy.split('-');
    
    result.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === 'price') {
        comparison = a.price - b.price;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [cakes, searchTerm, sortBy]);
  
  const handleAddCake = (cakeData: Omit<Cake, 'id'>) => {
    const newCake: Cake = {
        ...cakeData,
        id: Math.max(...cakes.map(c => c.id), 0) + 1,
    };
    setCakes(prev => [...prev, newCake]);
  };

  const handleUpdateCake = (updatedCake: Cake) => {
    setCakes(prev => prev.map(c => c.id === updatedCake.id ? updatedCake : c));
  };

  const handleDeleteCake = (id: number) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
        setCakes(prev => prev.filter(c => c.id !== id));
        setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderContent = () => {
    if (view === 'admin') {
        return <AdminPanel cakes={cakes} onAddCake={handleAddCake} onUpdateCake={handleUpdateCake} onDeleteCake={handleDeleteCake} />;
    }
    if (selectedCake) {
        return <CakeDetail cake={selectedCake} onBack={handleBackToShop} onAddToCart={handleAddToCart} />;
    }
    return (
        <>
            <ShopControls
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {filteredAndSortedCakes.map(cake => (
                    <CakeCard key={cake.id} cake={cake} onAddToCart={handleAddToCart} onViewDetails={handleViewDetails} />
                ))}
            </div>
        </>
    );
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-800">
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        view={view}
        onViewChange={(newView) => {
            setView(newView);
            setSelectedCake(null);
        }}
      />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onAddItem={handleAddItem}
        onDecrementItem={handleDecrementItem}
      />
    </div>
  );
};

export default App;
