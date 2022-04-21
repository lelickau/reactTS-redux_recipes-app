import React, { FC, MouseEvent, useState } from 'react';

import './myRecipeItem.scss';
import { useAppDispatch } from 'hooks/reduxHooks';
import { deleteRecipe } from 'store/slices/myRecipesSlice'
import { NavLink } from 'react-router-dom'
import Delete from 'components/UI/delete/Delete'
import Edit from 'components/UI/edit/Edit';
import OpenPanelIco from 'components/UI/openPanelIco/OpenPanelIco';

interface MyRecipeItemProps {
    label: string;
    notes: string;
    id: string;
    idx: number;
}

const MyRecipeItem: FC<MyRecipeItemProps> = ({label, notes, id, idx}) => {
    const dispatch = useAppDispatch()

    const deleteRecipeItem = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(deleteRecipe(id))
    }

    const [active, setActive] = useState(false)

    const toggleMenu = () => {
        setActive(!active)
    }

    return (
        <article className="myrecipe">
            <div className="myrecipe__main">
                <NavLink to={`mygusto/${idx}`}>
                    <div className="myrecipe__content">
                            <h2 className="myrecipe__title title">{label}</h2>
                        <p className="myrecipe__notes">{notes}</p>
                    </div>
                </NavLink>
            </div>
            <div className={`myrecipe__btns ${active ? 'myrecipe__btns--active' : ''}`}>
                <div className={`myrecipe__btn-panel ${active ? 'myrecipe__btn-panel--active' : ''}`} onClick={toggleMenu}>
                    <OpenPanelIco isOpenPanel={active ? true : false}/>
                </div>
                <NavLink to={`edit/${idx}`} className='myrecipe__btn-edit'>
                    <div className="myrecipe__edit-ico">
                        <Edit color='#ffffff'/>
                    </div>
                </NavLink>
                <button className='myrecipe__btn-delete' onClick={deleteRecipeItem}>
                    <div className="myrecipe__delete-ico">
                        <Delete color="#ffffff"/>
                    </div>
                </button>
            </div>
        </article>
    );
};

export default MyRecipeItem;