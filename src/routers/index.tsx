import React from 'react';
import {useRoutes} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import NonAuthorizedLayout from "../layouts/auth/NonAuthorizedLayout";
import Home from "../pages/Home/Home";
import {authorizedRoutes} from "./routerData";
import AuthorizedLayout from "../layouts/auth/AuthorizedLayout";
import GuestLayout from "../layouts/auth/GuestLayout";
import DashBoardAdmin from "../pages/Admin/Dashboard/DashBoardAdmin";
import AdminLayout from "../layouts/auth/AdminLayout";
import NotFound404 from "../pages/404/NotFound404";
import ManageHotel from "../pages/Admin/ManageHotel/ManageHotel";
import ManageHotelDetail from "../pages/Admin/ManageHotel/ManageHotelDetail";
import SendEmail from '../pages/Auth/SendEmail';
import ResetPassword from '../pages/Auth/ResetPassword';
import Hotel from "../pages/Hotel/Hotel";
import HotelDetail from "../pages/Hotel/HotelDetail";
import ManageCustomer from '../pages/Admin/ManageCustomer/ManageCustomer';

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
                    path: '/dashboard',
                    element: <Dashboard />
                },
                {
                    path: '/hotel/:hotel_id',
                    element: <HotelDetail />
                },
                {
                    path: '/404',
                    element: <NotFound404 />
                },
                {
                    path: '/',
                    element: <Hotel />
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
                },
                {
                    path: '/manage-hotel/:hotel_id',
                    element: <HotelDetail />
                },
                {
                    path: '/manage-customer',
                    element: <ManageCustomer/>
                },
            ]
        },
        {
            element: <NonAuthorizedLayout/>,
            children: [
                { 
                    path: '/sendEmail',
                    element: <SendEmail/>
                },
                {
                    path:'/reset-password',
                    element:<ResetPassword />
                }

            ],
        },
        {
            element: <AuthorizedLayout />,
            children: authorizedRoutes,
        },
    ]);
};

export default Router;