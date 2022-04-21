import Spinner from 'components/spinner/Spinner';
import React, {ButtonHTMLAttributes, FC} from 'react';

import './buttonElem.scss';

type ButtonElemProps = ButtonHTMLAttributes<HTMLButtonElement>
interface ButtonProps {
    status?: string | null;
}

const ButtonElem: FC<ButtonElemProps & ButtonProps> = ({status, children, ...rest}) => {
    return (
        <button className="main-btn" {...rest}>
            {children}
            {status === 'loading' && <div className="main-btn__loading"><Spinner/></div>}
        </button>
    );
};

export default ButtonElem;