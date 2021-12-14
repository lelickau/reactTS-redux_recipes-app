import React, { ButtonHTMLAttributes, FC } from 'react';

import './buttonAdd.scss';

type ButtonAddProps =  ButtonHTMLAttributes<HTMLButtonElement>

const ButtonAdd: FC<ButtonAddProps> = ({children, ...rest}) => {
    return <button className="btn-add" {...rest}>{children}</button>
};

export default ButtonAdd;