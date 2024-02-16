import React from 'react';
import Profile from "../pages/User/Profile";
import WsExample from "../pages/WsExample/WsExample";
import Payment from "../pages/Payment/Payment";
// import SingUp from '../pages/User/singup/SingUp';

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    { path: '/ws-example', element: <WsExample /> },
    { path: '/stripe-example', element: <Payment /> },
    // {path: 'singUp', element:<SingUp/>}
];

export { authorizedRoutes };