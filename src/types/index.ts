export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
  total: number;
}

export interface CartItem {
  quantity: number;
}