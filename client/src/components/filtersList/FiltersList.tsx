import React, {FC, useState} from 'react';
import filters from '../../data/filters.json';
import FilterItem from '../filterItem/FilterItem';

import './filtersList.scss';

interface FiltersListProps {
    isDescr: boolean;
    type: string;
    title: string;
}

const FiltersList: FC<FiltersListProps> = ({isDescr, type, title}) => {

    const [showFilter, setShowFilter] = useState(false);

    const openFilter = () => {
        setShowFilter(!showFilter)
    }

    return (
        <div className="filter-list">
            <h3
                onClick={openFilter}
                className="filter-list__title"
            >{title}</h3>
            <ul className={showFilter ? "filter-list__items" : "hidden"}>
            {
                filters.filter(item => item.type === type).map(filter => {
                    if (isDescr) {
                        return (
                            <FilterItem key={filter.id} title={filter.title} id={filter.id} descr={filter.descr}/>
                        )
                    } else {
                        return (
                            <FilterItem key={filter.id} title={filter.title} id={filter.id}/>
                        )
                    }
                })
            }
            </ul>
        </div>
    );
};

export default FiltersList;