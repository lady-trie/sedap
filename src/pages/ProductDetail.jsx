import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                if (response.status !== 200) {
                    setError("Gagal mengambil data produk");
                    return;
                }
                setProduct(response.data);
            })
            .catch((err) => {
                setError(err.message || "Gagal mengambil data produk");
            });
    }, [id]);

    if (error) return <div className="p-6 text-red-600 font-semibold text-center">⚠️ Error: {error}</div>;
    if (!product) return <div className="p-6 text-gray-500 text-center animate-pulse">Sedang memuat detail...</div>;

    return (
        <div className="p-6">
            <Link to="/products" className="text-sm font-medium text-emerald-600 hover:underline">
                ← Kembali ke Daftar Produk
            </Link>
            <div className="p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto mt-6 border border-gray-100">
                <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-contain bg-gray-50 rounded-xl mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                <p className="text-gray-500 text-sm mt-1 capitalize">Kategori: {product.category}</p>
                <p className="text-gray-600 mt-3 text-sm">{product.description}</p>
                <div className="mt-6 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Harga</span>
                    <span className="text-emerald-600 font-bold text-xl font-mono">
                        Rp {(product.price * 15000).toLocaleString("id-ID")}
                    </span>
                </div>
            </div>
        </div>
    );
}