import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <button className='header-button' onClick={handleProfileClick}>Особистий кабінет</button>
    );
}

export default ProfileButton;
