import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  /** 1. Inisialisasi state dataForm (SESUAI MODUL) **/
  // Menggabungkan beberapa state menjadi satu object agar lebih efisien
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  /** 2. Inisialisasi Handle perubahan nilai input form (SESUAI MODUL) **/
  // Fungsi general yang menggunakan properti 'name' untuk update state
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /** 3. Persiapan Logic Search & Filter **/
  // Mengubah pemanggilan menjadi dataForm.searchTerm
  const _searchTerm = dataForm.searchTerm.toLowerCase();

  // Logic mengambil nilai unique tags dari JSON
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ].sort();

  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12 border-l-8 border-blue-600 pl-6">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            FRAMEWORK<span className="text-blue-600">HUB</span>
          </h1>
          <p className="text-slate-500 font-medium">Eksplorasi teknologi modern sesuai standar modul.</p>
        </header>

        {/* FILTER SECTION: SESUAI MODUL (Menggunakan property name) */}
        <section className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <input
              type="text"
              name="searchTerm" // Property name harus sesuai dengan key di dataForm
              placeholder="Cari framework..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={dataForm.searchTerm} // Menggunakan dataForm
              onChange={handleChange} // Menggunakan handle tunggal
            />
          </div>

          <div className="w-full md:w-64">
            <select
              name="selectedTag" // Property name harus sesuai dengan key di dataForm
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer appearance-none"
              value={dataForm.selectedTag} // Menggunakan dataForm
              onChange={handleChange} // Menggunakan handle tunggal
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="">Semua Kategori</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </section>

        {/* DATA LIST (Sama dengan sebelumnya) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFrameworks.length > 0 ? (
            filteredFrameworks.map((item) => (
              <div key={item.id} className="group bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-colors group-hover:bg-blue-100"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{item.name}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.description}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{item.details.developer.charAt(0)}</div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Developer</p>
                      <p className="text-sm font-semibold text-slate-700">{item.details.developer} ({item.details.releaseYear})</p>
                    </div>
                  </div>
                  <a href={item.details.officialWebsite} target="_blank" rel="noreferrer" className="inline-block text-blue-600 font-bold text-sm border-b-2 border-blue-100 hover:border-blue-600 mb-6 transition-all">
                    Kunjungi Website Resmi →
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border border-blue-100">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Tidak ada framework yang cocok...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}