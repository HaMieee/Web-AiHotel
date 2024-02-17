import React from 'react';
import {useRoutes} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import NonAuthorizedLayout from "../layouts/auth/NonAuthorizedLayout";
import Home from "../pages/Home/Home";
import {authorizedRoutes} from "./routerData";
import AuthorizedLayout from "../layouts/auth/AuthorizedLayout";
import Login from "../pages/Auth/Login";
import GuestLayout from "../layouts/auth/GuestLayout";
import SingUp from '../pages/User/singup/SingUp';

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