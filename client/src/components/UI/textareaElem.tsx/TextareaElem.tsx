import React, { FC, TextareaHTMLAttributes } from 'react';

import './textarea.scss';

interface TextareaElemProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholderText: string;
    name?: string;
}

const TextareaElem: FC<TextareaElemProps> = ({placeholderText, name, ...rest}) => {
    return (
        <textarea className="textarea" name={name} placeholder={placeholderText} {...rest}></textarea>
    );
};

export default TextareaElem;