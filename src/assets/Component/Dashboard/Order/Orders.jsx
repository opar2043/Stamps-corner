import React, { useState } from "react";
import useOrder from "../../Hooks/useOrder";

const demoOrders = [
  {
    _id: "ORD001",
    userId: "USER001",
    paymentId: "PAY123",
    amount: 80,
    paymentMethod: "paypal",
    status: "paid",
    createdAt: "2026-01-15T10:30:00Z",
    items: [
      { productId: "P1", qty: 2, name: "Wireless Headphones", price: 30 },
      { productId: "P2", qty: 1, name: "USB-C Cable", price: 20 },
    ],
  },
  {
    _id: "ORD002",
    userId: "USER002",
    paymentId: "PAY456",
    amount: 150,
    paymentMethod: "stripe",
    status: "pending",
    createdAt: "2026-01-14T08:15:00Z",
    items: [{ productId: "P3", qty: 3, name: "Mechanical Keyboard", price: 50 }],
  },
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [order, refetch] = useOrder();
  // selectedOrder(order)
  
  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
          <p className="text-sm text-slate-500">Overview of all customer transactions</p>
        </div>
        <div className="rounded-lg bg-white px-4 py-2 shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
          Total Orders: {order?.length}
        </div>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Order ID</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Customer</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order && order.length > 0 ? order?.map((order) => (
              <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-blue-600">#{order._id}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{order.userId}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">£{order.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Details
                  </button>
                </td>
              </tr>
            )) : <p className="text-sm text-center text-red-500 w-full">No order here</p>}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-800">Order Information</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              {/* Meta Info */}
              <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm">
                <div>
                  <p className="text-slate-400">Customer ID</p>
                  <p className="font-semibold text-slate-700">{selectedOrder.userId}</p>
                </div>
                <div>
                  <p className="text-slate-400">Payment Method</p>
                  <p className="font-semibold text-slate-700 uppercase">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Items List */}
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Line Items</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      <span className="font-medium text-slate-800">{item.name || `Product ${item.productId}`}</span>
                      <span className="ml-2 text-slate-400">x{item.qty}</span>
                    </span>
                    <span className="font-medium text-slate-700">£{((item.price || 0) * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                <span className="text-base font-medium text-slate-500">Total Amount</span>
                <span className="text-2xl font-black text-slate-900">£{selectedOrder.amount.toFixed(2)}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;