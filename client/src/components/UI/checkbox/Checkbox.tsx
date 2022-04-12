import React, {ChangeEvent, FC} from 'react';

import './checkbox.scss';

interface CheckboxProps {
    title: string;
    id: string;
    type: string;
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({title, id, changeHandler, type}) => {
    return (
        <div className="checkbox">
            <input
                onChange={changeHandler}
                className="checkbox__input"
                name={type}
                type="checkbox"
                id={id}
                value={id}
            />
            <label htmlFor={id} className="checkbox__label">{title}</label>
        </div>
    );
};

export default Checkbox;