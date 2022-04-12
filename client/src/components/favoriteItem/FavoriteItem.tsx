import React, {FC, useState} from 'react';

import sourceIco from 'resources/ico/source.svg'
import openPanel from 'resources/ico/open.svg'
import deleteIco from 'resources/ico/delete.svg'
import './favoriteItem.scss'
import { useAppDispatch } from 'hooks/reduxHooks';
import { deleteFavoriteRecipe } from 'store/slices/favoritesSlice';
import { changeFavs } from 'store/slices/recipesSlice';
import { NavLink } from 'react-router-dom';

interface FavoriteItemProps {
    label: string;
    source: string;
    sourceUrl: string;
    id: string;
    recipeId: string;
    imgUrl: string;
    idx: number;
}

const FavoriteItem: FC<FavoriteItemProps> = ({label, source, sourceUrl, id, recipeId, imgUrl, idx}) => {
    const dispatch = useAppDispatch()
    const [active, setActive] = useState(false)

    const deleteFav = () => {
        dispatch(deleteFavoriteRecipe(id))
        dispatch(changeFavs(recipeId))
    }

    const toggleMenu = () => {
        setActive(!active)
    }

    return (
        <div className="favorite">
            <div className={`favorite__main  ${active && 'favorite__main--active'}`}>
                <div className="favorite__content">
                    <img className='favorite__img' src={imgUrl} alt={label} />
                    <div className="favorite__text">
                        <NavLink to={`favs/${idx}`}><h2 className='favorite__title'>{label}</h2></NavLink>
                        <div className="favorite__source">
                            <img className='favorite__source-ico' src={sourceIco} alt="Sourse" />
                            <a href={sourceUrl} target="_blank" className='favorite__source-text'>{source}</a>
                        </div>
                    </div>
                </div>
                <div className="favorite__btn-panel" onClick={toggleMenu}>
                    <img className='favorite__panel-ico' src={openPanel} alt="Info" />
                </div>
            </div>
            <div className={`favorite__btns ${active && 'favorite__btns--active'}`}>
                <button className='favorite__btn-delete' onClick={deleteFav}>
                    <img src={deleteIco} alt="Delete" />
                </button>
            </div>
        </div>
    );
};

export default FavoriteItem;