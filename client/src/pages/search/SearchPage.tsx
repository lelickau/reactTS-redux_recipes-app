import React, { ChangeEvent, FC, MouseEvent, useState } from 'react'
import InputElem from '../../components/UI/input/InputElem'
import ButtonElem from '../../components/UI/button/ButtonElem'
import FiltersList from '../../components/filtersList/FiltersList'
import RecipeItem from 'components/recipeItem/RecipeItem'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'

import './searchPage.scss'
import { nextSearchRecipes, searchRecipes } from 'store/slices/recipesSlice'

const SearchPage:FC = () => {
    const dispatch  = useAppDispatch()
    const {recipes, error, nextPage} = useAppSelector(state => state.recipes)

    const [activeFilters, setActiveFilters] = useState(false)
    const openFilters = () => {
        setActiveFilters(!activeFilters)
    }

    const [postForm, setPostForm] = useState({
        recipeName: ''
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPostForm({...postForm, [e.target.name]: e.target.value})
    }

    const searchRecipe = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(searchRecipes(postForm))
    }

    type Filters = {
        title: string;
        type: string;
        descr: boolean;
    }

    const filters: Array<Filters> = [
        {title: 'Diet', type: "diet", descr: true},
        {title: 'Meal types', type: "mealType", descr: false},
        {title: 'Health', type: "health", descr: true},
        {title: 'Dish types', type: "dishType", descr: false},
        {title: 'Cuisine types', type: "cuisineType", descr: false},
    ]

    const fetchMoreRecipes = (e: MouseEvent) => {
        dispatch(nextSearchRecipes(nextPage))
    }

    return (
        <section className="search">
        <form className="search__form">
            <div className="search__item item-search">
                <h1 className="search__item-title">Search recipe</h1>
                <div className="search__input-box">
                    <InputElem
                    onChange={changeHandler}
                        placeholder="pizza"
                        name="recipeName"
                        type="text"
                    />
                    <ButtonElem
                        onClick={searchRecipe}
                    >Search</ButtonElem>
                </div>
            </div>
            <div
                className={`search__item
                    ${activeFilters ? " item-filter--active" : " item-filter"}`}
            >
                <h2 className="search__item-title">Search filters</h2>
                <div className="search__filters-ico-btn" onClick={openFilters}>
                    <span
                        className={activeFilters ? 'search__filters-ico--close' : 'search__filters-ico'}>
                    </span>
                    <span
                        className={activeFilters ? 'search__filters-ico--close' : 'search__filters-ico'}>
                    </span>
                    <span
                        className={activeFilters ? 'search__filters-ico--close' : 'search__filters-ico'}>
                    </span>
                </div>
                <div
                    className={activeFilters ? "search__filters-box--active" : "search__filters-box"}
                >
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
        <div className="search__content">
        {
            recipes?.length ?
            recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe} />)
            :
            error
        }
        {
            nextPage &&
            <div
                className="search__next-page"
                onClick={fetchMoreRecipes}
            >Load more</div>
        }

        </div>

    </section>
    );
};

export default SearchPage;