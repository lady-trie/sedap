import axios from 'axios'

const API_URL = "https://cohfttmnhesyfbzanvlm.supabase.co/rest/v1/notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaGZ0dG1uaGVzeWZiemFudmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDgyNjAsImV4cCI6MjA5NjQyNDI2MH0.TIjy-v0kfirtYZYBcw1K7kzQmFghffm_uEi3TrHj8YU"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    // Mengambil semua data notes (Method: GET)
    async fetchNotes() {
        try {
            const response = await axios.get(API_URL, { headers })
            return response.data
        } catch (error) {
            console.error("Error fetching notes:", error.response?.data || error.message)
            throw error
        }
    },

    // Membuat note baru (Method: POST)
    async createNote(data) {
        try {
            const response = await axios.post(API_URL, data, { headers })
            return response.data
        } catch (error) {
            console.error("Error creating note:", error.response?.data || error.message)
            throw error
        }
    },

    // TAMBAHAN POIN 7: Menghapus catatan berdasarkan ID (Method: DELETE)
    async deleteNote(id) {
        try {
            await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
        } catch (error) {
            console.error("Error deleting note:", error.response?.data || error.message)
            throw error
        }
    }
}