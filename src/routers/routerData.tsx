import React from 'react';
import Profile from "../pages/User/Profile";
import WsExample from "../pages/WsExample/WsExample";
import Payment from "../pages/Payment/Payment";
import ChangePassword from '../layouts/components/profileInfo/ChangePassword';
import UpdateInfo from '../layouts/components/updateInfo/UpdateInfo';

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    { path: '/ws-example', element: <WsExample /> },
    { path: '/stripe-example', element: <Payment /> },
    { path: '/change-password',element: <ChangePassword/>},
    { path: '/update_info', element: <UpdateInfo/>},
];

export { authorizedRoutes };