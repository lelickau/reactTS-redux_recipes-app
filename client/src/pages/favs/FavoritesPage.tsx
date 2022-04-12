import FavoriteItem from 'components/favoriteItem/FavoriteItem';
import MyRecipeItem from 'components/myRecipeItem/MyRecipeItem';
import Preloader from 'components/preloader/Preloader';
import Spinner from 'components/spinner/Spinner';
import { useAppSelector } from 'hooks/reduxHooks';
import { IMyRecipe } from 'models/IMyRecipe';
import { IRecipeInStore } from 'models/IRecipe';
import React, { FC } from 'react';

import './favoritesPage.scss';

const FavoritesPage:FC = () => {
    const {favorites, status} = useAppSelector(state => state.favorites)
    const {myRecipes} = useAppSelector(state => state.myRecipe)
    const statusMyRecipes = useAppSelector(state => state.myRecipe.status)


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
                            label={item.label}
                            source={item.source}
                            sourceUrl={item.url}
                            id={item.id}
                            recipeId={item.recipeId}
                            imgUrl={item.image}
                            idx={idx}
                        />)
                    : status !== 'loading' && <div>The list of favorites is empty</div>
                }
            </article>
            <article className="favs__item">
                <h2 className="favs__title title">My Recipes
                {statusMyRecipes === 'loading' && <Spinner/>}
                </h2>
                {
                    myRecipes.length ?
                    myRecipes.map((item: IMyRecipe, idx) =>
                        <MyRecipeItem
                            key={item.id||idx}
                            label={item.label}
                            notes={item.notes||''}
                            id={item.id}
                            />
                    )
                    : statusMyRecipes !== 'loading' && <div>The list of recipes is empty</div>
                }
            </article>
        </section>
    );
};

export default FavoritesPage;