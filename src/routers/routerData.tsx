import React from 'react';
import Profile from "../pages/User/Profile";
import SingUp from '../pages/User/singup/SingUp';

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    {path: 'singUp', element:<SingUp/>}
];

export { authorizedRoutes };