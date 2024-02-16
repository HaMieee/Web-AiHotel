import React from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../redux/slices/auth.slice";
import {RootState} from "../../redux/store";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const handleLogout = () => {
        dispatch({
            type: `${authActions.logoutPending}_saga`,
        })
        navigate('/');
    };

    return (
        <>
            <div>Dashboard</div>
            <button onClick={() => navigate('/home')}>Home page</button>
            <button onClick={() => navigate('/profile')}>Profile page</button>
            <button onClick={() => navigate('/ws-example')}>WS Example</button>
            { token ?
                <button onClick={handleLogout}>Logout</button>
                :
                <button onClick={() => navigate('/login')}>login</button>
            }
        </>
    )
}

export default Dashboard;