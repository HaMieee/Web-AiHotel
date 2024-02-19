import React from 'react';
import Profile from "../pages/User/Profile";
import WsExample from "../pages/WsExample/WsExample";
import Payment from "../pages/Payment/Payment";

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    { path: '/ws-example', element: <WsExample /> },
    { path: '/stripe-example', element: <Payment /> },
];

export { authorizedRoutes };