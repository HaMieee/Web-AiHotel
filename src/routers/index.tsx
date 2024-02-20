import React from 'react';
import {useRoutes} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import NonAuthorizedLayout from "../layouts/auth/NonAuthorizedLayout";
import Home from "../pages/Home/Home";
import {authorizedRoutes} from "./routerData";
import AuthorizedLayout from "../layouts/auth/AuthorizedLayout";
import Login from "../pages/Auth/Login";
import GuestLayout from "../layouts/auth/GuestLayout";
import ManageRoom from "../pages/Admin/ManageRoom/ManageRoom";
import SingUp from "../pages/Auth/SingUp";
import DashBoardAdmin from "../pages/Admin/Dashboard/DashBoardAdmin";
import AdminLayout from "../layouts/auth/AdminLayout";
import NotFound404 from "../pages/404/NotFound404";
import ManageHotel from "../pages/Admin/ManageHotel/ManageHotel";

const Router = () => {
    return useRoutes([
        {
            element: <GuestLayout />,
            children: [
                {
                    path: '/home',
                    element: <Home />,
                },
                {
                    path: '/',
                    element: <Dashboard />
                },
                {
                    path: '/hotel/:id',
                    element: <ManageRoom />
                },
                {
                    path: '/404',
                    element: <NotFound404 />
                }
            ]
        },
        {
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: <DashBoardAdmin />
                },
                {
                    path: '/manage-hotel',
                    element: <ManageHotel />
                }
            ]
        },
        {
            element: <NonAuthorizedLayout/>,
            children: [
                {
                  path: '/login',
                  element: <Login />
                },
                {
                    path: '/SingUp',
                    element: <SingUp/>
                  },
            ],
        },
        {
            element: <AuthorizedLayout />,
            children: authorizedRoutes,
        },
    ]);
};

export default Router;