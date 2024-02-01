import { useRoutes } from "react-router-dom"
import Home from "../pages/user/home/Home"
import VeAiHotel from "../layouts/components/veaihotel/VeAiHotel";
import Login from "../pages/user/login/Login";
import SingUp from "../pages/user/singup/SingUp";

const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/veAiHotel',
            element: <VeAiHotel/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path:'/singUp',
            element:<SingUp/>
        }
    ])
}

export default Router;