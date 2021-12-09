import React, {ButtonHTMLAttributes, FC} from 'react';

import './buttonElem.scss';

type ButtonElemProps = ButtonHTMLAttributes<HTMLButtonElement>

const ButtonElem: FC<ButtonElemProps> = ({children, ...rest}) => {
    return (
        <button className="main-btn" {...rest}>
            {children}
        </button>
    );
};

export default ButtonElem;