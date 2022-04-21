import React, { FC } from 'react';
import './eyeIco.scss'

interface EyeIcoProps {
    isOpen: boolean;
}

const EyeIco: FC<EyeIcoProps> = ({isOpen}) => {
    return (
        <div className={isOpen ? 'eye-ico eye-ico--active' : 'eye-ico'}></div>
    );
};

export default EyeIco;