import { BiAddToQueue } from "react-icons/bi"; 
import { AiFillFolderAdd } from "react-icons/ai"; 
import { FcCustomerSupport } from "react-icons/fc"; 
import { AiFillCustomerService } from "react-icons/ai"; 
import { CgBorderStyleDashed } from "react-icons/cg"; 
import { MdSpaceDashboard } from "react-icons/md"; 
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-base-100 p-10 shadow-lg transition-colors duration-200">
            
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span 
                    id="logo-title" 
                    className="font-poppins font-[1000] text-[48px] text-base-content"
                >
                    Sedap<b className="text-primary">.</b>
                </span>

                <span 
                    id="logo-subtitle" 
                    className="text-base-content/50 font-semibold text-sm"
                >
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="menu p-0 [&_li>*]:p-4 [&_li>*]:rounded-xl space-y-2 text-base-content font-medium">
                    <li>
                        <Link id="menu-1" to="/" className="hover:bg-primary/20 active:bg-primary active:text-primary-content">
                            <MdSpaceDashboard className="text-xl"/>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link id="menu-2" to="/Orders" className="hover:bg-primary/20 active:bg-primary active:text-primary-content">
                            <CgBorderStyleDashed className="text-xl" />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link id="menu-3" to="/Customers" className="hover:bg-primary/20 active:bg-primary active:text-primary-content">
                            <FcCustomerSupport className="text-xl" />
                            Customers
                        </Link>
                    </li>
                    <li>
                        <Link id="menu-4" to="/Products" className="hover:bg-primary/20 active:bg-primary active:text-primary-content">
                            <AiFillCustomerService className="text-xl" />
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link id="menu-5" to="/Notes" className="hover:bg-primary/20 active:bg-primary active:text-primary-content">
                            <AiFillFolderAdd className="text-xl text-warning" />
                            Notes
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-primary text-primary-content px-4 py-4 rounded-xl shadow-md mb-6 flex items-center justify-between gap-2">
                    <div id="footer-text" className="text-sm">
                        <p className="font-medium leading-tight">Please organize your menus through button below!</p>
                        
                        <button id="add-menu-button" className="btn btn-sm w-full mt-3 flex items-center justify-center gap-1 bg-white border-none text-gray-700 hover:bg-gray-100">
                            <BiAddToQueue className="text-lg" />
                            Add Menus
                        </button>
                    </div>
                    <img id="footer-avatar" className="w-10 h-10 rounded-full border-2 border-white/50" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Syifa" alt="avatar" />
                </div>
                
                <div className="text-xs text-base-content/40 font-medium">
                    <span id="footer-brand" className="font-bold block mb-1">Sedap Restaurant Admin Dashboard</span>
                    <p id="footer-copyright">&copy; 2025 All Right Reserved</p>
                </div>
            </div>
        </div>
    );
}