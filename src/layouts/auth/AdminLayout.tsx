import {Navigate, Outlet} from "react-router";
import React from "react";
import BlankLayout from "../blankLayout/BlankLayout";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const AdminLayout = () => {
    const roleState = useSelector((state: RootState) => state.auth.userInfo.role_type);
    if (roleState !== 'admin') {
        return <Navigate to={'/404'} replace />
    }

    return (
        <BlankLayout>
            <Outlet />
        </BlankLayout>
    )
}

export default AdminLayout;