import React from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';
import { Package2 } from 'lucide-react';

const STATUS_LABELS = {
  pending: 'En attente',
  processing: 'En cours de traitement',
  shipped: 'Expédié',
  delivered: 'Livré'
};

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800'
};

export default function Orders() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchOrders() {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(orders || []);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Chargement de vos commandes...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package2 className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-2xl font-serif">Aucune commande</h2>
        <p className="mt-2 text-gray-600">
          Vous n'avez pas encore passé de commande.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-serif mb-8">Mes commandes</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">
                  Commande du {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="mt-1 font-medium">{order.total.toFixed(2)}€</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${STATUS_COLORS[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}