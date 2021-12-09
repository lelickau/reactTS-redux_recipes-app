import React, { FC } from 'react';

import './searchPage.scss';
import InputElem from '../../components/UI/input/InputElem';
import ButtonElem from '../../components/UI/button/ButtonElem';
import FiltersList from '../../components/filtersList/FiltersList';

const SearchPage:FC = () => {

    const filters = [
        {title: 'Diet', type: "diet", descr: true},
        {title: 'Meal types', type: "mealType", descr: false},
        {title: 'Health', type: "health", descr: true},
        {title: 'Dish types', type: "dishType", descr: false},
        {title: 'Cuisine types', type: "cuisineType", descr: false},
    ]


    return (
        <form className="search">
            <div className="search__item">
                <h1 className="search__item-title">Search recipe</h1>
                <div className="search__input-box">
                    <InputElem
                        placeholder="pizza"
                        name="search"
                        type="text"
                    />
                    <ButtonElem>Search</ButtonElem>
                </div>
            </div>
            <div className="search__item item-filter">
                <h2 className="search__item-title">Search filters</h2>
                <div className="search__filters-box">
                    <div className="search__filter-item">
                        <h3 className="search__filter-title">Number of ingredients:</h3>
                        <div className={"search__filter-ingr"}>
                            <label className="search__filter-ingr-label">
                                <InputElem
                                    placeholder="1"
                                    type="number"
                                    name="min-ingr"
                                    min="1"
                                    max="10"
                                /> MIN
                            </label>
                            <label className="search__filter-ingr-label">
                                <InputElem
                                    placeholder="10"
                                    type="number"
                                    name="max-ingr"
                                    min="1"
                                    max="10"
                                />MAX
                            </label>
                        </div>
                    </div>
                    {
                        filters.map((item, index) => {
                            return (
                                <FiltersList key={index} title={item.title} isDescr={item.descr} type={item.type} />
                            )
                        })
                    }
                </div>
            </div>
        </form>
    );
};

export default SearchPage;