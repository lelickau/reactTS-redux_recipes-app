import React, { ChangeEvent, FC, TextareaHTMLAttributes } from 'react';
import { IMySteps } from 'models/IMyRecipe';

import './textarea.scss';

interface TextareaElemProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string
    placeholderText: string;
    name: string;
    instrData?: IMySteps;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => any;
}

const TextareaElem: FC<TextareaElemProps> = ({placeholderText, name, id, onChange, instrData, ...rest}) => {
    return (
        <textarea
            className="textarea"
            name={name}
            data-id={id}
            placeholder={placeholderText}
            onChange={onChange}
            value={instrData && instrData.step}
            {...rest}
        ></textarea>
    );
};

export default TextareaElem;