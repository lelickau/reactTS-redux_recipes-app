import React, { ChangeEvent, FC, TextareaHTMLAttributes } from 'react';

import './textarea.scss';

interface TextareaElemProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string
    placeholderText: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => any;
}

const TextareaElem: FC<TextareaElemProps> = ({placeholderText, name, id, onChange, ...rest}) => {
    return (
        <textarea
            className="textarea"
            name={name}
            data-id={id}
            placeholder={placeholderText}
            onChange={onChange}
            {...rest}
        ></textarea>
    );
};

export default TextareaElem;