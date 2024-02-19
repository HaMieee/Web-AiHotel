import React, {ReactNode} from "react";
import Header from "../components/header/Header";
import Footer from "../footer/Footer";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({children}) => {
    const userInfo = useSelector((state: RootState) => state.auth.userInfo)

    return (
        <div className={"app-blank"}>
            <Header userInfo={userInfo}/>
            <div className={"container-fluid"}>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default DefaultLayout;