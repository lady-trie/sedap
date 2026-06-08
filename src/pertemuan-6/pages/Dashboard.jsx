import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div id="dashboard-container">

         
            <div className="mb-4">
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-gray-400 text-sm">
                    Home / Home Detail / Home Very Detail
                </p>
            </div>

            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-green-500 rounded-full p-4">
                        <FaShoppingCart className="text-3xl text-white"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">75</span>
                        <span className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div className="bg-blue-500 rounded-full p-4">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">175</span>
                        <span className="text-gray-400">Total Delivered</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div className="bg-red-500 rounded-full p-4">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">40</span>
                        <span className="text-gray-400">Total Canceled</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div className="bg-yellow-500 rounded-full p-4">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp.128</span>
                        <span className="text-gray-400">Total Revenue</span>
                    </div>
                </div>

            </div>
        </div>
    );
}