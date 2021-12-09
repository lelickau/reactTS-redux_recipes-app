import React, { FC, useState } from 'react';
import Checkbox from '../UI/checkbox/Checkbox';

import './filterItem.scss';

interface FilterItemProps {
    title: string;
    id: string;
    descr?: string;
}

const FilterItem:FC<FilterItemProps> = ({title, id, descr}) => {
    const [showDescr, setShowDescr] = useState(false);

    const visibleDescr = () => {
        setShowDescr(!showDescr);
    }
    return (
        <li className="filter-item">
            <div className="filter-item__box-title">
                <Checkbox title={title} id={id}/>
                {
                    descr &&
                    <div
                        className="filter-item__ico-descr"
                        onClick={visibleDescr}
                    >?</div>
                }
            </div>
            {
                descr &&
                <p className={showDescr ? "filter-item__descr" : "hidden"}>{descr}</p>
            }

        </li>
    );
};

export default FilterItem;