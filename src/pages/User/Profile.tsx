import React from 'react';
import {authActions} from "../../redux/slices/auth.slice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleDemo = () => {
        console.log('hello')
    }

    const handleLogout = () => {
        dispatch({
            type: `${authActions.logoutPending}_saga`,
        })
        navigate('/');
    };
    return (
        <>
            <div>Profile Page</div>
            <button onClick={handleDemo}>click me</button>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Profile;