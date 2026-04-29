import Sidebar from "@/components/sidebar";
import {ReactNode} from "react";

export default function ({children}:{children:ReactNode}){
    return(<div>
        <Sidebar/>
        {children}

    </div>)
}