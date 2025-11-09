export interface Cake {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}