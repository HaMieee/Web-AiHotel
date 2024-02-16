import React, {ReactNode} from "react";
import DemoHeader from "../components/test/DemoHeader";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <div className={"app-blank"}>
            <DemoHeader/>
            <div className={"container-fluid"}>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;