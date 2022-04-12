import HeartFavs from 'components/UI/heartFavs/HeartFavs'
import React, { FC } from 'react'

import './buttonFavs.scss'

interface ButtonFavsProps {
    active: boolean;
    addFavs: () => void;
}

const ButtonFavs: FC<ButtonFavsProps> = ({active, addFavs}) => {
    return (
        <button
            onClick={addFavs}
            className="favorite-btn">
            <HeartFavs active={active}/>
        </button>
    );
};

export default ButtonFavs;