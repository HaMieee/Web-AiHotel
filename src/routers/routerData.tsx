import React from 'react';
import Profile from "../pages/User/Profile";
import WsExample from "../pages/WsExample/WsExample";
import ChangePassword from '../layouts/components/profileInfo/ChangePassword';

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    { path: '/ws-example', element: <WsExample /> },
    { path: '/change-password',element: <ChangePassword/>},
];

export { authorizedRoutes };