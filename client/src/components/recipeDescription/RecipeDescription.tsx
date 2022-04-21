import React, { FC } from 'react'
import Tag from 'components/UI/tag/Tag'

import './recipeDescription.scss'
import weightIco from 'resources/ico/weight.svg'
import kcalIco from 'resources/ico/kcal.svg'
import sourceIco from 'resources/ico/source.svg'

interface RecipeDescriptionProps {
    label: string;
    url: string;
    source: string;
    cuisineType: string[];
    dishType: string[];
    mealType: string[];
    totalWeight: number;
    calories: number;
}

const RecipeDescription:FC<RecipeDescriptionProps> = ({label, url, source, cuisineType, dishType, mealType, totalWeight, calories}) => {
    return (
        <div className="recipe-descr">
            <h2 className="recipe-descr__title title">{label}</h2>
                <div className="recipe-descr__total-box">
                    <div className="recipe-descr__total">
                        <img
                            className="recipe-descr__total-ico"
                            src={weightIco}
                            alt="Weight"
                        />
                        <span className="recipe-descr__total-count">{totalWeight}g</span>
                    </div>
                    <div className="recipe-descr__total">
                        <img
                            className="recipe-descr__total-ico"
                            src={kcalIco}
                            alt="Colories"
                        />
                        <span className="recipe-descr__total-count">{calories}Cal</span>
                    </div>
                    <div className="recipe-descr__total">
                        <img
                            className="recipe-descr__total-ico"
                            src={sourceIco}
                            alt="Source"
                        />
                        <a
                            className="recipe-descr__source"
                            target="_blank"
                            href={url}
                            rel="noreferrer"
                            >"{source}"
                        </a>
                    </div>
                </div>
                <div className="recipe-descr__tags">
                    { cuisineType?.map(tag => <Tag key={tag} label={tag}/>) }
                    { dishType?.map(tag => <Tag key={tag} label={tag}/>) }
                    { mealType?.map(tag => <Tag key={tag} label={tag}/>) }
                </div>
        </div>
    );
};

export default RecipeDescription;