import React, { ChangeEvent, FC, MouseEvent, useState } from 'react'
import InputElem from '../../components/UI/input/InputElem'
import ButtonElem from '../../components/UI/button/ButtonElem'
import FiltersList from '../../components/filtersList/FiltersList'
import RecipeItem from 'components/recipeItem/RecipeItem'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'

import './searchPage.scss'
import { nextSearchRecipes, searchRecipes } from 'store/slices/recipesSlice'
import Preloader from 'components/preloader/Preloader'
import { IRecipeInStore } from 'models/IRecipe'

const SearchPage:FC = () => {
    const dispatch  = useAppDispatch()
    const {recipes, error, nextPage, status} = useAppSelector(state => state.recipes)

    const [activeFilters, setActiveFilters] = useState(false)
    const openFilters = () => {
        setActiveFilters(!activeFilters)
    }

    const [form, setForm] = useState({
        recipeName: '',
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    let [checkbox, setCheckbox] = useState('')
    const changeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckbox(checkbox+=`&${e.target.name}=${e.target.value}`)
    }

    const [errorIngr, setErrorIngr] = useState('')
    let [numOfIngr, setNumOfIngr] = useState('')
    const changeIngr = (e: ChangeEvent<HTMLInputElement>) => {
        const pattern = new RegExp('^[0-9\-%]+$')

        if (pattern.test(e.target.value)) {
            setNumOfIngr(`&ingr${e.target.value}`)
            setErrorIngr('')
        } else if (e.target.value === '') {
            setErrorIngr('')
        } else if (!pattern.test(e.target.value)) {
            setErrorIngr('Numbers only')
        }
    }

    const searchRecipe = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(searchRecipes({...form, filters: checkbox, numOfIngr}))
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
                            <label className="search__filter-ingr-label">{errorIngr}
                                <InputElem
                                    onChange={changeIngr}
                                    placeholder="1 or 1-12"
                                    type="string"
                                    name="maxIngr"
                                    min="1"
                                />MAX | MIN-MAX
                            </label>
                        </div>
                    </div>
                    {
                        filters.map((item, index) => {
                            return (
                                <FiltersList
                                    key={index}
                                    title={item.title}
                                    isDescr={item.descr}
                                    type={item.type}
                                    changeHandler={changeHandlerCheckbox}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </form>
        <div className="search__content">
        {status === 'loading' && <Preloader isLocal={true}/>}
        {
            recipes?.length
            ? recipes.map((recipe: IRecipeInStore, index) => <RecipeItem key={index+recipe.id} idRecipe={index} recipe={recipe} />)
            : error
        }
        </div>
        {
            nextPage &&
            <div
                className="search__next-page"
                onClick={fetchMoreRecipes}
            >Load more</div>
        }
    </section>
    );
};

export default SearchPage;