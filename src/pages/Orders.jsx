import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'Farhan Khairi', items: 'Nasi Goreng Sedap (2x)', total: 'Rp 45.000', status: 'Pending' },
    { id: 'ORD-002', customer: 'Rian Apriandi', items: 'Ayam Bakar (1x)', total: 'Rp 32.000', status: 'Processing' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [form, setForm] = useState({ customer: '', items: '', total: '', status: 'Pending' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setForm({ customer: '', items: '', total: '', status: 'Pending' });
    setIsEdit(false);
    setIsOpen(true);
  };

  const openEditModal = (order) => {
    setForm({ customer: order.customer, items: order.items, total: order.total, status: order.status });
    setCurrentId(order.id);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setOrders(orders.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      const newOrder = { id: `ORD-${Date.now().toString().slice(-3)}`, ...form };
      setOrders([...orders, newOrder]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Hapus order ini?")) setOrders(orders.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders List</h1>
        <button onClick={openAddModal} className="bg-[#00B074] hover:bg-[#009662] text-white px-4 py-2 rounded-lg font-medium transition">+ Create Order</button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{isEdit ? 'Edit Order' : 'Create New Order'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600">Customer Name</label>
                <input type="text" name="customer" value={form.customer} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Items</label>
                <input type="text" name="items" value={form.items} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" placeholder="e.g. Mie Goreng (1x)" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Total Amount</label>
                <input type="text" name="total" value={form.total} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" placeholder="Rp 25.000" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500">
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">Cancel</button>
                <button type="submit" className="bg-[#00B074] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#009662]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#00B074] text-white text-sm font-semibold">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-bold text-gray-800">{order.id}</td>
                <td className="p-4 font-medium">{order.customer}</td>
                <td className="p-4 text-gray-600">{order.items}</td>
                <td className="p-4 font-semibold">{order.total}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                </td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => openEditModal(order)} className="text-amber-600 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded text-xs font-semibold">Edit</button>
                  <button onClick={() => handleDelete(order.id)} className="text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;