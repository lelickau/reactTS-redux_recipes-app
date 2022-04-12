import React, {FC} from 'react'

import './tag.scss'

interface TagProps {
    label: string;
}

const Tag: FC<TagProps> = ({label}) => {
    return (
        <span className="tag" key={label}>{label}</span>
    );
};

export default Tag;