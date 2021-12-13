import React, { FC, TextareaHTMLAttributes } from 'react';

import './textarea.scss';

interface TextareaElemProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholderText: string;
}

const TextareaElem: FC<TextareaElemProps> = ({placeholderText, ...rest}) => {
    return (
        <textarea className="textarea" placeholder={placeholderText} {...rest}></textarea>
    );
};

export default TextareaElem;