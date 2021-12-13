import React, { ButtonHTMLAttributes, FC } from 'react';

import './buttonAdd.scss';

type ButtonAddProps =  ButtonHTMLAttributes<HTMLButtonElement>

const ButtonAdd: FC<ButtonAddProps> = ({...rest}) => {
    return <button className="btn-add" {...rest}></button>
};

export default ButtonAdd;