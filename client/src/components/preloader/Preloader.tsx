import React from 'react';

import './preloader.scss'

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
        </div>
    );
};

export default Preloader;