import React, { FC } from 'react';
import './buttonBack.scss'
interface ButtonBackProps {
    backTo: () => void;
}

const ButtonBack: FC<ButtonBackProps> = ({backTo}) => {
    return (
        <button className="back-btn" onClick={backTo}>
            <svg width="26" height="17" viewBox="0 0 26 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.45898" y="7.40723" width="24" height="2" rx="1" fill="#FF3B30"/>
                <rect x="0.680664" y="8.3916" width="11.8681" height="2" rx="1" transform="rotate(-45 0.680664 8.3916)" fill="#FF3B30"/>
                <rect x="2.13232" y="6.99023" width="11.7046" height="2.00097" rx="1" transform="rotate(45 2.13232 6.99023)" fill="#FF3B30"/>
            </svg>
        </button>
    );
};

export default ButtonBack;