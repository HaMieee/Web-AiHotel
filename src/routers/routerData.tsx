import React from 'react';
import Profile from "../pages/User/Profile";
import WsExample from "../pages/WsExample/WsExample";
import Payment from "../pages/Payment/Payment";
import ChangePassword from '../layouts/components/profileInfo/ChangePassword';
import Reservation from "../pages/User/Reservation/Reservation";
import ReservationDetail from "../pages/User/Reservation/ReservationDetail";

const authorizedRoutes = [
    { path: '/profile', element: <Profile /> },
    { path: '/ws-example', element: <WsExample /> },
    { path: '/stripe-example', element: <Payment /> },
    { path: '/change-password',element: <ChangePassword/>},
    { path: '/reservation',element: <Reservation />},
    { path: '/reservation/:id',element: <ReservationDetail />},
];

export { authorizedRoutes };