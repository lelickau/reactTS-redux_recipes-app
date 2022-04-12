import React, { ChangeEvent, FC, useState } from 'react';
import Checkbox from '../UI/checkbox/Checkbox';

import './filterItem.scss';

interface FilterItemProps {
    title: string;
    id: string;
    descr?: string;
    type: string;
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterItem:FC<FilterItemProps> = ({title, id, descr, changeHandler, type}) => {
    const [showDescr, setShowDescr] = useState(false)

    const visibleDescr = () => {
        setShowDescr(!showDescr)
    }

    return (
        <li className="filter-item">
            <div className="filter-item__box-title">
                <Checkbox
                    title={title}
                    id={id}
                    changeHandler={changeHandler}
                    type={type}
                />
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