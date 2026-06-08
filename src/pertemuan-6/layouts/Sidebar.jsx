import { BiAddToQueue } from "react-icons/bi"; 
import { AiFillFolderAdd } from "react-icons/ai"; 
import { FcCustomerSupport } from "react-icons/fc"; 
import { AiFillCustomerService } from "react-icons/ai"; 
import { CgBorderStyleDashed } from "react-icons/cg"; 
import { MdSpaceDashboard } from "react-icons/md"; 
import { Link } from "react-router-dom";
export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
    <span 
        id="logo-title" 
        className="font-poppins font-[1000] text-[48px] text-gray-900"
    >
        Sedap<b className="text-green-500">.</b>
    </span>

    <span 
        id="logo-subtitle" 
        className="text-gray-400 font-semibold"
    >
        Modern Admin Dashboard
    </span>
</div>

            {/* List Menu */}
            <Link id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
	                    <Link id="menu-1" to="/" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                            <MdSpaceDashboard className="mr-4 text-xl"/>
                            Dashboard</Link>
	                  </li>
                    <li>
	                    <Link id="menu-2" to="/orders" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                            <CgBorderStyleDashed className="mr-4 text-xl" />
                            Orders</Link>
	                  </li>
	                  <li>
	                    <Link id="menu-3" to="/customers" className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                            <FcCustomerSupport className="mr-4 text-xl" />
                            Customers</Link>
	                  </li>
                </ul>
            </Link>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <span className="text-gray-600 flex items-center">
                                <BiAddToQueue />
                                Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" className="w-8 h-8 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Syifa" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}
