// src/pages/Info.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Info = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <button onClick={handleBack} style={{ position: 'absolute', top: '20px', right: '20px' }}>X</button>
            <h1>Product Manager Accelerator</h1>
            <p>The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.</p>
            <p>Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavours.</p>
        </div>
    );
};

export default Info;
