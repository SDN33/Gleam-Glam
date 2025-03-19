import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Package2, DollarSign, ShoppingCart, Users, Truck, AlertTriangle, CheckCircle2, Clock, Package } from 'lucide-react';

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalCustomers: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
}

interface ChartData {
  date: string;
  revenue: number;
  orders: number;
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800'
};

const STATUS_LABELS = {
  pending: 'En attente',
  processing: 'En cours',
  shipped: 'Expédié',
  delivered: 'Livré'
};

export default function Admin() {
  const [stats, setStats] = useState<OrderStats>({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch orders
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (orders) {
          const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
          const uniqueCustomers = new Set(orders.map(order => order.user_id));

          // Count orders by status
          const statusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
          }, {});

          setStats({
            totalOrders: orders.length,
            totalRevenue,
            averageOrderValue: totalRevenue / orders.length || 0,
            totalCustomers: uniqueCustomers.size,
            pendingOrders: statusCounts.pending || 0,
            processingOrders: statusCounts.processing || 0,
            shippedOrders: statusCounts.shipped || 0,
            deliveredOrders: statusCounts.delivered || 0
          });

          // Process data for charts
          const last30Days = [...Array(30)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
          }).reverse();

          const chartData = last30Days.map(date => {
            const dayOrders = orders.filter(order => 
              order.created_at.startsWith(date)
            );
            return {
              date,
              revenue: dayOrders.reduce((sum, order) => sum + order.total, 0),
              orders: dayOrders.length,
            };
          });

          setChartData(chartData);
          setRecentOrders(orders.slice(0, 10));
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Refresh data after update
      window.location.reload();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F7CAC9]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif">Administration</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedTab('dashboard')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedTab === 'dashboard'
                ? 'bg-[#F7CAC9] text-white'
                : 'hover:bg-[#F7CAC9]/10'
            }`}
          >
            Tableau de bord
          </button>
          <button
            onClick={() => setSelectedTab('orders')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedTab === 'orders'
                ? 'bg-[#F7CAC9] text-white'
                : 'hover:bg-[#F7CAC9]/10'
            }`}
          >
            Commandes
          </button>
          <button
            onClick={() => setSelectedTab('logistics')}
            className={`px-4 py-2 rounded-lg transition ${
              selectedTab === 'logistics'
                ? 'bg-[#F7CAC9] text-white'
                : 'hover:bg-[#F7CAC9]/10'
            }`}
          >
            Logistique
          </button>
        </div>
      </div>

      {selectedTab === 'dashboard' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <DollarSign className="h-10 w-10 text-[#F7CAC9]" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Revenu total</p>
                  <p className="text-2xl font-semibold">{stats.totalRevenue.toFixed(2)}€</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <ShoppingCart className="h-10 w-10 text-[#F7CAC9]" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total commandes</p>
                  <p className="text-2xl font-semibold">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <Package2 className="h-10 w-10 text-[#F7CAC9]" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Panier moyen</p>
                  <p className="text-2xl font-semibold">{stats.averageOrderValue.toFixed(2)}€</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <Users className="h-10 w-10 text-[#F7CAC9]" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Clients uniques</p>
                  <p className="text-2xl font-semibold">{stats.totalCustomers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-6">Évolution du revenu (30 jours)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F7CAC9"
                      name="Revenu (€)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-6">Commandes par statut</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{
                    name: 'Statuts',
                    pending: stats.pendingOrders,
                    processing: stats.processingOrders,
                    shipped: stats.shippedOrders,
                    delivered: stats.deliveredOrders
                  }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pending" fill="#FCD34D" name="En attente" />
                    <Bar dataKey="processing" fill="#60A5FA" name="En cours" />
                    <Bar dataKey="shipped" fill="#A78BFA" name="Expédié" />
                    <Bar dataKey="delivered" fill="#34D399" name="Livré" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Gestion des commandes</h2>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${STATUS_COLORS.pending}`}>
                {stats.pendingOrders} en attente
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${STATUS_COLORS.processing}`}>
                {stats.processingOrders} en cours
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${STATUS_COLORS.shipped}`}>
                {stats.shippedOrders} expédiées
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-4 font-medium">ID Commande</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Client</th>
                  <th className="pb-4 font-medium">Total</th>
                  <th className="pb-4 font-medium">Statut</th>
                  <th className="pb-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-4">{order.id.slice(0, 8)}...</td>
                    <td className="py-4">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4">{order.user_id.slice(0, 8)}...</td>
                    <td className="py-4">{order.total.toFixed(2)}€</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${STATUS_COLORS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">En attente</option>
                        <option value="processing">En cours</option>
                        <option value="shipped">Expédié</option>
                        <option value="delivered">Livré</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === 'logistics' && (
        <div className="space-y-8">
          {/* Logistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <AlertTriangle className="h-10 w-10 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">En attente</p>
                  <p className="text-2xl font-semibold">{stats.pendingOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <Clock className="h-10 w-10 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">En préparation</p>
                  <p className="text-2xl font-semibold">{stats.processingOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <Truck className="h-10 w-10 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">En transit</p>
                  <p className="text-2xl font-semibold">{stats.shippedOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Livrées</p>
                  <p className="text-2xl font-semibold">{stats.deliveredOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Queue */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-medium mb-6">File d'expédition</h3>
            <div className="space-y-4">
              {recentOrders
                .filter(order => order.status === 'pending' || order.status === 'processing')
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <Package className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">Commande #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${STATUS_COLORS[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">En attente</option>
                        <option value="processing">En cours</option>
                        <option value="shipped">Expédié</option>
                        <option value="delivered">Livré</option>
                      </select>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}