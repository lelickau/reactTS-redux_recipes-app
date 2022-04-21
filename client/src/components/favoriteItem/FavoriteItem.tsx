import React, {FC, useState} from 'react';

import sourceIco from 'resources/ico/source.svg'
import weightIco from 'resources/ico/weight.svg'
import kcalIco from 'resources/ico/kcal.svg'
import './favoriteItem.scss'
import { useAppDispatch } from 'hooks/reduxHooks';
import { deleteFavoriteRecipe } from 'store/slices/favoritesSlice';
import { changeFavs } from 'store/slices/recipesSlice';
import { NavLink } from 'react-router-dom';
import { IRecipeInStore } from 'models/IRecipe';
import Delete from 'components/UI/delete/Delete';
import OpenPanelIco from 'components/UI/openPanelIco/OpenPanelIco';

interface FavoriteItemProps {
    idx: number;
    recipe: IRecipeInStore;
}

const FavoriteItem: FC<FavoriteItemProps> = ({recipe, idx}) => {
    const dispatch = useAppDispatch()
    const [active, setActive] = useState(false)

    const deleteFav = () => {
        dispatch(deleteFavoriteRecipe(recipe.id))
        dispatch(changeFavs(recipe.recipeId))
    }

    const toggleMenu = () => {
        setActive(!active)
    }

    return (
        <div className="favorite">
            <div className={`favorite__main  ${active ? 'favorite__main--active' : ''}`}>
                <div className="favorite__content">
                    <div className="favorite__descr">
                        <div className="favorite__total">
                            <img
                                className="favorite__total-ico"
                                src={weightIco}
                                alt="Weight"
                            />
                            <span className="favorite__total-count">{recipe.totalWeight}g</span>
                        </div>
                        <div className="favorite__total">
                            <img
                                className="favorite__total-ico"
                                src={kcalIco}
                                alt="Colories"
                            />
                            <span className="favorite__total-count">{recipe.calories}Cal</span>
                        </div>
                    </div>
                    <div className="favorite__text">
                        <NavLink to={`favs/${idx}`}><h2 className='favorite__title'>{recipe.label}</h2></NavLink>
                        <div className="favorite__source">
                            <img className='favorite__source-ico' src={sourceIco} alt="Sourse" />
                            <a href={recipe.url} target="_blank" rel='noreferrer' className='favorite__source-text'>{recipe.source}</a>
                        </div>
                    </div>
                </div>
                <div className="favorite__btn-panel" onClick={toggleMenu}>
                    <OpenPanelIco isOpenPanel={active ? true : false}/>
                </div>
            </div>
            <div className={`favorite__btns ${active ? 'favorite__btns--active' : ''}`} onClick={deleteFav}>
                <Delete color='#ffffff'/>
            </div>
        </div>
    );
};

export default FavoriteItem;