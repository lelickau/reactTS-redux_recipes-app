import React, {FC, MouseEvent} from 'react';
import {NavLink} from 'react-router-dom';
import { useHistory } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import { IIsAuth } from 'models/IIsAuth';
import { useAppDispatch } from 'hooks/reduxHooks';
import { removeUser } from 'store/slices/userSlice';

import loginIco from '../../resources/ico/login.svg';
import logoutIco from '../../resources/ico/logout.svg';
import favsIco from '../../resources/ico/favs.svg';
import searchIco from '../../resources/ico/search.svg';
import createIco from '../../resources/ico/create.svg';
import logo from '../../resources/ico/logo.svg';
import './navbar.scss';

const Sidebar:FC<IIsAuth> = ({isAuth}) => {
    const {push} = useHistory()
    const dispatch = useAppDispatch()

    const logoutUser = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                dispatch(removeUser())
                push('/')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <header className="header">
            <nav className="header__nav">
                <ul className="header__list">
                    <li className="header__item">
                        <NavLink to="/home" className="header__link"
                        activeClassName="header__link--active">
                            <img src={logo} alt="login" className="header__ico" />
                            <span className="header__item-name">My Gusto</span>
                        </NavLink>
                    </li>
                    <li className="header__item">
                        {!isAuth
                            ?
                        <NavLink to="/login" className="header__link" activeClassName="header__link--active">
                            <img src={loginIco} alt="login" className="header__ico" />
                            <span className="header__item-name">Log in</span>
                        </NavLink>
                            :
                        <button
                            onClick={logoutUser}
                            className="header__link">
                            <img src={logoutIco} alt="logout" className="header__ico" />
                            <span className="header__item-name">Log out</span>
                        </button>
                        }
                    </li>
                    <li className="header__item">
                        <NavLink to="/search" className="header__link" activeClassName="header__link--active">
                            <img src={searchIco} alt="Search" className="header__ico" />
                            <span className="header__item-name">Search</span>
                        </NavLink>
                    </li>
                    <li className="header__item">
                        <NavLink to="/favs" className="header__link" activeClassName="header__link--active">
                            <img src={favsIco} alt="Favs" className="header__ico" />
                            <span className="header__item-name">My book</span>
                        </NavLink>
                    </li>
                    <li className="header__item">
                        <NavLink to="/create" className="header__link" activeClassName="header__link--active">
                            <img src={createIco} alt="Create" className="header__ico" />
                            <span className="header__item-name">Create</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Sidebar;