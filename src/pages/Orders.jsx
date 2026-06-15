import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-001', customer: 'Farhan Khairi', items: 'Nasi Goreng Sedap (2x)', total: 'Rp 45.000', status: 'Pending' },
    { id: 'ORD-002', customer: 'Rian Apriandi', items: 'Ayam Bakar (1x)', total: 'Rp 32.000', status: 'Processing' },
  ]);

  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [form, setForm] = useState({ customer: '', items: '', total: '', status: 'Pending' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setForm({ customer: '', items: '', total: '', status: 'Pending' });
    setIsEdit(false);
    document.getElementById('order_modal').showModal(); // Menggunakan mekanisme modul
  };

  const openEditModal = (order) => {
    setForm({ customer: order.customer, items: order.items, total: order.total, status: order.status });
    setCurrentId(order.id);
    setIsEdit(true);
    document.getElementById('order_modal').showModal(); // Menggunakan mekanisme modul
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setOrders(orders.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      const newOrder = { id: `ORD-${Date.now().toString().slice(-3)}`, ...form };
      setOrders([...orders, newOrder]);
    }
    document.getElementById('order_modal').close(); // Menutup modal setelah submit
  };

  const handleDelete = (id) => {
    if (confirm("Hapus order ini?")) setOrders(orders.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-base-content">Orders List</h1>
        {/* Tombol menggunakan class DaisyUI 'btn' */}
        <button onClick={openAddModal} className="btn bg-[#00B074] hover:bg-[#009662] text-white border-none">+ Create Order</button>
      </div>

      {/* 1️⃣ STRUKTUR MODAL DIUBAH MENGIKUTI MODUL PERTEMUAN 13 */}
      <dialog id="order_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">{isEdit ? 'Edit Order' : 'Create New Order'}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-base-content/70">Customer Name</label>
              <input type="text" name="customer" value={form.customer} onChange={handleChange} className="input input-bordered w-full text-sm mt-1" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-base-content/70">Items</label>
              <input type="text" name="items" value={form.items} onChange={handleChange} className="input input-bordered w-full text-sm mt-1" placeholder="e.g. Mie Goreng (1x)" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-base-content/70">Total Amount</label>
              <input type="text" name="total" value={form.total} onChange={handleChange} className="input input-bordered w-full text-sm mt-1" placeholder="Rp 25.000" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-base-content/70">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="select select-bordered w-full text-sm mt-1">
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div className="modal-action">
              {/* Form internal dengan method="dialog" otomatis menutup modal saat diklik */}
              <button type="button" onClick={() => document.getElementById('order_modal').close()} className="btn">Cancel</button>
              <button type="submit" className="btn bg-[#00B074] hover:bg-[#009662] text-white border-none">Save</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* STRUKTUR TABEL */}
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