import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import Responsive from "./Responsive";

createRoot(document.getElementById("root"))
    .render(
        <div>
           {/*} <FrameworkList/>*/}
           {/*}<FrameworkListSearchFilter/>*/}
           <Responsive />

            
        </div>
    )