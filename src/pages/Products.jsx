import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Diperlukan untuk navigasi ke halaman detail
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; // Icon untuk error handling
import PageHeader from "../components/PageHeader";

export default function Products() {
    const breadcrumb = ["Dashboard", "Product List"];

    // 1️⃣ Definisikan semua State yang dibutuhkan
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(""); // State untuk menampung teks pencarian

    // 2️⃣ Terapkan useEffect + Axios dengan teknik Debounce 500ms
    useEffect(() => {
        // Bungkus request API ke dalam setTimeout (Debounce)
        const timeout = setTimeout(() => {
            axios
                .get(`https://dummyjson.com/products/search?q=${query}`)
                .then((response) => {
                    if (response.status !== 200) {
                        setError(response.data.message);
                        return;
                    }
                    setProducts(response.data.products);
                })
                .catch((err) => {
                    setError(err.message || "An unknown error occurred");
                });
        }, 500); // API baru ditembak setelah user berhenti mengetik selama 500ms

        // Fungsi Cleanup: Menghapus timeout sebelumnya jika user mengetik huruf baru dengan cepat
        return () => clearTimeout(timeout);
    }, [query]); // useEffect akan mendeteksi setiap perubahan pada state 'query'

    // 3️⃣ Membuat tampilan komponen informasi Error jika API gagal
    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null;

    return (
        <div className="p-6">
            <PageHeader title="Products" breadcrumb={breadcrumb} />

            {/* Menampilkan kotak error jika ada kendala jaringan/API */}
            {errorInfo}

            {/* 4️⃣ Tambahkan Kolom Input Pencarian di atas tabel */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk..."
                className="mb-6 p-3 w-full bg-white rounded-2xl shadow-md border border-gray-100 focus:outline-emerald-500 transition-all"
            />

            {/* 5️⃣ Tabel Tampilan Utama */}
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
                <thead>
                    <tr className="bg-emerald-600 text-white text-left text-sm font-semibold">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Vendor</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                    {/* Berikan indikasi jika data sedang kosong/dimuat */}
                    {products.length === 0 && !error ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                Memuat data atau produk tidak ditemukan...
                            </td>
                        </tr>
                    ) : (
                        products.map((item, index) => (
                            <tr
                                key={item.id} // Aman menggunakan item.id karena DummyJson menyediakannya
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-700">
                                    {index + 1}.
                                </td>
                                {/* Mengubah Nama Produk menjadi komponen Link menuju halaman detail */}
                                <td className="px-6 py-4 font-semibold">
                                    <Link 
                                        to={`/products/${item.id}`} 
                                        className="text-emerald-600 hover:text-emerald-700 hover:underline"
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 capitalize">{item.category}</td>
                                {/* Mengonversi mata uang dollar DummyJson dengan perkalian simulasi rupiah rupiah */}
                                <td className="px-6 py-4 font-mono">
                                    Rp {(item.price * 15000).toLocaleString("id-ID")}
                                </td>
                                <td className="px-6 py-4 text-gray-500">{item.brand || "Generic"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}