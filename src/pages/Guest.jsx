import React, { useState } from 'react';

const Guest = () => {
  const [guests, setGuests] = useState([
    { id: '1', name: 'Table 05 (Walk-in)', pax: '4', arrivalTime: '12:30 PM' },
    { id: '2', name: 'Anisa Putri (Booking)', pax: '2', arrivalTime: '01:15 PM' },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [form, setForm] = useState({ name: '', pax: '', arrivalTime: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAddModal = () => {
    setForm({ name: '', pax: '', arrivalTime: '' });
    setIsEdit(false);
    setIsOpen(true);
  };

  const openEditModal = (guest) => {
    setForm({ name: guest.name, pax: guest.pax, arrivalTime: guest.arrivalTime });
    setCurrentId(guest.id);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setGuests(guests.map(item => item.id === currentId ? { ...item, ...form } : item));
    } else {
      const newGuest = { id: String(Date.now()), ...form };
      setGuests([...guests, newGuest]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Kosongkan meja / hapus tamu?")) setGuests(guests.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Guest & Table Book</h1>
        <button onClick={openAddModal} className="bg-[#00B074] hover:bg-[#009662] text-white px-4 py-2 rounded-lg font-medium transition">+ Add Guest</button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{isEdit ? 'Edit Guest Info' : 'Add Guest Table'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600">Guest / Table Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Jumlah Orang (Pax)</label>
                <input type="number" name="pax" value={form.pax} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Waktu Datang</label>
                <input type="text" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 focus:outline-emerald-500" placeholder="e.g. 14:00 WIB" required />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">Cancel</button>
                <button type="submit" className="bg-[#00B074] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#009662]">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#00B074] text-white text-sm font-semibold">
              <th className="p-4 w-16 text-center">#</th>
              <th className="p-4">Table / Guest Name</th>
              <th className="p-4">Pax</th>
              <th className="p-4">Arrival Time</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {guests.map((guest, index) => (
              <tr key={guest.id} className="hover:bg-gray-50 transition">
                <td className="p-4 text-center font-medium text-gray-500">{index + 1}.</td>
                <td className="p-4 font-semibold text-gray-800">{guest.name}</td>
                <td className="p-4"><span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold">{guest.pax} Pax</span></td>
                <td className="p-4 text-gray-600">{guest.arrivalTime}</td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => openEditModal(guest)} className="text-amber-600 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded text-xs font-semibold">Edit</button>
                  <button onClick={() => handleDelete(guest.id)} className="text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-xs font-semibold">Checkout/Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Guest;