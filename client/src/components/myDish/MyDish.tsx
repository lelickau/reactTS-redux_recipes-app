import React, {FC, MouseEvent} from 'react'
import { useHistory, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { IParams } from 'models/IParams'
import { IMyIngr, IMySteps, IMyRecipe } from 'models/IMyRecipe'
import Delete from 'components/UI/delete/Delete'

import './myDish.scss'
import timeIco from 'resources/ico/time.svg'
import servesIco from 'resources/ico/serves.svg'
import ButtonBack from 'components/UI/buttonBack/ButtonBack'
import { deleteRecipe } from 'store/slices/myRecipesSlice'
import Edit from 'components/UI/edit/Edit'
import { NavLink } from 'react-router-dom'

const MyDish: FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<IParams>()
    const recipe:IMyRecipe = useAppSelector(state => state.myRecipe.myRecipes[+id])

    const history = useHistory()

    const backToSearch = () => {
        history.push('/favs')
    }

    if (!recipe) {
        history.push('/favs')
    }

    const deleteRecipeItem = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteRecipe(recipe.id))
        backToSearch()
    }

    return (
        <section className="mydish">
            <div className="mydish__control">
                <ButtonBack backTo={backToSearch}/>
                <div className="mydish__btns-edits">
                    <NavLink to={`/edit/${id}`} className="mydish__btn mydish__edit">
                        <Edit color='#FF3B30' />
                    </NavLink>
                    <button className="mydish__btn mydish__delete" onClick={deleteRecipeItem}>
                        <Delete color="#FF3B30"/>
                    </button>
                </div>
            </div>
            <div className="mydish__main">
                <article className="mydish__item">
                    <h1 className="mydish__title title">{recipe.label}</h1>
                    <div className="mydish__descr">
                        <div className="mydish__descr-item">
                            <img src={servesIco} alt="serves" className="mydish__descr-ico" />
                            <span className="mydish__descr-text">
                                Serves {recipe.servings || '0'}
                            </span>
                        </div>
                        <div className="mydish__descr-item">
                            <img src={timeIco} alt="time" className="mydish__descr-ico" />
                            <span className="mydish__descr-text">
                                {recipe.time || '0'} min
                            </span>
                        </div>
                    </div>
                    <div className="mydish__ingredients">
                        <h3 className='mydish__title title'>Ingredients:</h3>
                        <ul className="mydish__ingredients-list">
                            {
                                recipe.ingredients.map((ingr: IMyIngr) =>
                                <li
                                    key={ingr.id}
                                    className="mydish__ingr">
                                        {`${ingr.ingr} ${ingr.quant}${ingr.measure}`}
                                </li>)
                            }
                        </ul>
                    </div>
                </article>
                {recipe.instructions?.length ?
                    <article className='mydish__item'>
                        <h3 className='mydish__title'>Instructions:</h3>
                        <ul className="mydish__instructions-list">
                            {
                                recipe.instructions.map((ingr: IMySteps) =>
                                <li
                                    key={ingr.id}
                                    className="mydish__instr">
                                        {ingr.step}
                                </li>)
                            }
                        </ul>
                    </article>
                : <></>
                }
            </div>
        </section>
    );
};

export default MyDish;