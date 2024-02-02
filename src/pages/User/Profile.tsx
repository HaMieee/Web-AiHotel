import React from 'react';

const Profile = () => {
    const handleDemo = () => {
        console.log('hello')
    }
    return (
        <>
            <div>Profile Page</div>
            <button onClick={handleDemo}>click me</button>
        </>
    )
};

export default Profile;