import React, { FC, MouseEvent } from 'react';

import './myRecipeItem.scss';
import deleteIco from 'resources/ico/delete.svg'
import { useAppDispatch } from 'hooks/reduxHooks';
import { deleteRecipe } from 'store/slices/myRecipesSlice';

interface MyRecipeItemProps {
    label: string;
    notes: string;
    id: string;
}

const MyRecipeItem: FC<MyRecipeItemProps> = ({label, notes, id}) => {
    const dispatch = useAppDispatch()

    const deleteRecipeItem = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteRecipe(id))
        
    }

    return (
        <article className="myrecipe">
            <div className="myrecipe__main">
                <h2 className="myrecipe__title">{label}</h2>
                <p className="myrecipe__notes">{notes}</p>
            </div>
            <div className="favorite__btns">
                <button className='favorite__btn-delete' onClick={deleteRecipeItem}>
                    <img src={deleteIco} alt="Delete" />
                </button>
            </div>
        </article>
    );
};

export default MyRecipeItem;