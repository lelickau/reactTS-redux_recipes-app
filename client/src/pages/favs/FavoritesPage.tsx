import React, { FC } from 'react';
import FavoriteItem from 'components/favoriteItem/FavoriteItem';
import Spinner from 'components/spinner/Spinner';
import { useAppSelector } from 'hooks/reduxHooks';
import { IRecipeInStore } from 'models/IRecipe';

import './favoritesPage.scss';

const FavoritesPage:FC = () => {
    const {favorites, status} = useAppSelector(state => state.favorites)
    return (
        <section className="favs">
            <article className="favs__item">
                <h1 className="favs__title title">Favorites
                {status === 'loading' && <Spinner/>}
                </h1>
                {
                    favorites.length ?
                    favorites.map((item: IRecipeInStore, idx) =>
                        <FavoriteItem
                            key={item.label+idx}
                            recipe={item}
                            idx={idx}
                        />)
                    : status !== 'loading' && <div>The list of favorites is empty</div>
                }
            </article>
        </section>
    );
};

export default FavoritesPage;