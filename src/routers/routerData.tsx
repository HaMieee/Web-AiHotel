import React from 'react';
import Profile from "../pages/User/Profile";
import WsExample from "../pages/WsExample/WsExample";
// import SingUp from '../pages/User/singup/SingUp';

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    { path: '/ws-example', element: <WsExample /> },
    // {path: 'singUp', element:<SingUp/>}
];

export { authorizedRoutes };