import MyRecipeItem from 'components/myRecipeItem/MyRecipeItem';
import Spinner from 'components/spinner/Spinner';
import { useAppSelector } from 'hooks/reduxHooks';
import { IMyRecipe } from 'models/IMyRecipe';
import React, { FC } from 'react';

import './home.scss'

const HomePage: FC = () => {
    const {myRecipes, status} = useAppSelector(state => state.myRecipe)
    return (
        <section className='home'>
            <article className="home__item">
                <h2 className="home__title title">My Recipes
                {status === 'loading' && <Spinner/>}
                </h2>
                {
                    myRecipes.length ?
                    myRecipes.map((item: IMyRecipe, idx) =>
                        <MyRecipeItem
                            key={item.id||idx}
                            label={item.label}
                            notes={item.notes||''}
                            id={item.id}
                            idx={idx}
                            />
                    )
                    : status !== 'loading' && <div>The list of recipes is empty</div>
                }
            </article>
        </section>
    );
};

export default HomePage;