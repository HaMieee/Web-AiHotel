import React, {ReactNode} from "react";

const BlankLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={"app-blank"}>
            Blank layout
            {children}
        </div>
    )
}

export default BlankLayout;