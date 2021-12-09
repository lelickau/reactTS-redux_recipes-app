import React, {FC} from 'react';

import './checkbox.scss';

interface CheckboxProps {
    title: string;
    id: string;
}

const Checkbox: FC<CheckboxProps> = ({title, id}) => {
    return (
        <div className="checkbox">
            <input
                className="checkbox__input"
                name={id}
                type="checkbox"
                id={id}
                value={id}
            />
            <label htmlFor={id} className="checkbox__label">{title}</label>
        </div>
    );
};

export default Checkbox;