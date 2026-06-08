import { useState, useEffect } from "react"
import { notesAPI } from "../service/noteAPI"
import AlertBox from "../components/AlertBox"
import GenericTable from "../components/GenericTable"
import LoadingSpinner from "../components/LoadingSpinner"
import EmptyState from "../components/EmptyState"
import { AiFillDelete } from "react-icons/ai" // Import ikon hapus data

export default function Notes() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [notes, setNotes] = useState([]) // State untuk menampung list notes
    
    const [dataForm, setDataForm] = useState({
        title: "", content: "", status: ""
    })

    // Load data saat komponen pertama kali di-render
    useEffect(() => {
        loadNotes()
    }, [])

    // Memanggil fetchNotes beserta error/loading handling
    const loadNotes = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await notesAPI.fetchNotes()
            setNotes(data)
        } catch (err) {
            setError("Gagal memuat catatan")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Handle perubahan nilai input form
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    // Handle form submission untuk membuat catatan baru
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await notesAPI.createNote(dataForm)

            setSuccess("Catatan berhasil ditambahkan!")

            // Kosongkan Form setelah Success
            setDataForm({ title: "", content: "", status: "" })

            // Hilangkan pesan Success setelah 3 detik
            setTimeout(() => setSuccess(""), 3000)
            
            // Panggil Ulang loadNotes untuk refresh data otomatis di tabel
            loadNotes()
            
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    // Handle untuk aksi hapus data (Poin 7)
    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus catatan ini?")
        if (!konfirmasi) return

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await notesAPI.deleteNote(id)
            setSuccess("Catatan berhasil dihapus!")

            // Hilangkan pesan sukses setelah 3 detik
            setTimeout(() => setSuccess(""), 3000)

            // Refresh data otomatis di tabel setelah berhasil menghapus
            loadNotes()
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Notes App
                </h2>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Tambah Catatan Baru
                </h3>

                {/* Tampilkan AlertBox jika terjadi error atau success */}
                {error && <AlertBox type="error">{error}</AlertBox>}
                {success && <AlertBox type="success">{success}</AlertBox>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={dataForm.title}
                        placeholder="Judul catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                            duration-200 disabled:opacity-50 disabled:bg-gray-100"
                    />

                    <textarea
                        name="content"
                        value={dataForm.content}
                        placeholder="Isi catatan"
                        onChange={handleChange}
                        disabled={loading}
                        required
                        rows="2"
                        className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                            focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                            duration-200 resize-none disabled:opacity-50 disabled:bg-gray-100"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                            rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500
                            focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200 shadow-lg"
                    >
                        {loading ? "Mohon Tunggu..." : "Tambah Catatan"}
                    </button>
                </form>
            </div>

            {/* --- Notes Table Section --- */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Daftar Catatan ({notes.length})
                    </h3>
                </div>
              
                {/* 1. Kondisi saat Loading */}
                {loading && <LoadingSpinner text="Memuat catatan..." />}

                {/* 2. Kondisi saat Data Kosong dan Tidak Error */}
                {!loading && notes.length === 0 && !error && (
                    <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
                )}

                {/* 3. Kondisi saat Data Kosong karena Error */}
                {!loading && notes.length === 0 && error && (
                    <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
                )}
                
                {/* 4. Kondisi saat Data Berhasil Tampil */}
                {!loading && notes.length > 0 ? (
                    <GenericTable
                        columns={["#", "Judul", "Isi Catatan", "Aksi"]} // Ditambahkan kolom "Aksi"
                        data={notes}
                        renderRow={(note, index) => (
                            <>
                                <td className="px-6 py-4 font-medium text-gray-700">
                                    {index + 1}.
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-emerald-600">
                                        {note.title}
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <div className="truncate text-gray-600">
                                        {note.content}
                                    </div>
                                </td>
                                {/* Kolom aksi berisi tombol Delete */}
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(note.id)}
                                        disabled={loading}
                                        className="focus:outline-none disabled:opacity-50"
                                    >
                                        <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                                    </button>
                                </td>
                            </>
                        )}
                    />
                ) : null}
            </div>
        </div>
    )
}