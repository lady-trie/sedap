import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Guest from "./pages/Guest";
import PageHeader from "./components/PageHeader";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Notes from "./pages/Notes";
import "./assets/tailwind.css";


function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div id="main-content" className="flex-1 p-4">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/guest" element={<Guest />}/>
            <Route path="/products" element={<Products />} />
            <Route path="/notes" element={<Notes/>} />
            {/* 2️⃣ TAMBAHKAN ROUTE DINAMIS INI */}
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;