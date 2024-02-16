import React, {ReactNode} from "react";
import Header from "../components/header/Header";
import Footer from "../footer/Footer";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <div className={"app-blank"}>
            <Header />
            <div className={"container-fluid"}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout;