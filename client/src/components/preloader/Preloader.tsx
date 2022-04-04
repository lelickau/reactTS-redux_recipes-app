import React, { FC } from 'react';

import './preloader.scss'

interface PreloaderProps {
    isLocal: boolean;
}

const Preloader:FC<PreloaderProps> = ({isLocal}) => {
    return (
        <div className={isLocal ? "local-preloader" : "preloader"}>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
            <div className="preloader__dot"></div>
        </div>
    );
};

export default Preloader;