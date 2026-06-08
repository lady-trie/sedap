import React, { useState } from 'react';

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: '1', name: 'Farhan Khairi', email: 'farhan@example.com', phone: '08123456789', status: 'Active' },
    { id: '2', name: 'Syifa Fauziah', email: 'syifa@example.com', phone: '08987654321', status: 'Active' },
  ]);

  // State untuk Form Input & Modal
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', status: 'Active' });

  // Handle Input Perubahan Form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Buka Modal untuk Tambah Data (Create)
  const openAddModal = () => {
    setForm({ name: '', email: '', phone: '', status: 'Active' });
    setIsEdit(false);
    setIsOpen(true);
  };

  // Buka Modal untuk Edit Data (Update - Read Data ke Form)
  const openEditModal = (customer) => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone, status: customer.status });
    setCurrentId(customer.id);
    setIsEdit(true);
    setIsOpen(true);
  };

  // Simpan Data (Create & Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return alert("Semua kolom harus diisi!");

    if (isEdit) {
      // UPDATE
      setCustomers(customers.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      // CREATE
      const newCustomer = { id: String(Date.now()), ...form };
      setCustomers([...customers, newCustomer]);
    }
    setIsOpen(false);
  };

  // Hapus Data (Delete)
  const handleDelete = (id) => {
    if (confirm("Hapus pelanggan ini?")) {
      setCustomers(customers.filter(item => item.id !== id));
    }
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers Management</h1>
        <button onClick={openAddModal} className="bg-[#00B074] hover:bg-[#009662] text-white px-4 py-2 rounded-lg font-medium transition">
          + Add New Customer
        </button>
      </div>

      {/* MODAL FORM (POPUP UNTUK C & U) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{isEdit ? 'Edit Customer' : 'Add New Customer'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Phone</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" placeholder="0812345..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">Cancel</button>
                <button type="submit" className="bg-[#00B074] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#009662]">{isEdit ? 'Save Changes' : 'Submit'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TABLE (READ) */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#00B074] text-white text-sm font-semibold">
              <th className="p-4 w-16 text-center">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {customers.map((customer, index) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition">
                <td className="p-4 text-center font-medium text-gray-500">{index + 1}.</td>
                <td className="p-4 font-semibold text-[#00B074]">{customer.name}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{customer.status}</span>
                </td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => openEditModal(customer)} className="text-amber-600 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded text-xs font-semibold">Edit</button>
                  <button onClick={() => handleDelete(customer.id)} className="text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs font-semibold">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;