import React, { FC } from 'react';

interface DeleteProp {
    color: string;
}

const Delete: FC<DeleteProp> = ({color}) => {
    return (
        <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 9H27V30C27 31.6569 25.6569 33 24 33H8C6.34315 33 5 31.6569 5 30V9Z" stroke={color} strokeWidth="2"/>
            <rect x="10" y="14" width="2" height="14" rx="1" fill={color}/>
            <rect x="15" y="14" width="2" height="14" rx="1" fill={color}/>
            <rect x="20" y="14" width="2" height="14" rx="1" fill={color}/>
            <path d="M3 5H29C30.1046 5 31 5.89543 31 7V9H1V7C1 5.89543 1.89543 5 3 5Z" stroke={color} strokeWidth="2"/>
            <path d="M14 1H18C20.2091 1 22 2.79086 22 5H10C10 2.79086 11.7909 1 14 1Z" stroke={color} strokeWidth="2"/>
        </svg>
    );
};

export default Delete;