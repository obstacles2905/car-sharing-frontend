import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <button onClick={handleProfileClick}>Личный кабинет</button>
    );
}

export default ProfileButton;
