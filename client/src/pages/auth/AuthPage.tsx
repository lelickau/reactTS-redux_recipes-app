import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonElem from '../../components/UI/button/ButtonElem';
import InputElem from '../../components/UI/input/InputElem';
import { login } from '../../redux/actions/user';

import './authPage.scss';

const AuthPage:FC = () => {
    const dispatch = useDispatch();
    interface IUser {
        username: string;
        email: string;
        password: string;
    }

    const [user, setUser] = useState<IUser>({
        username: '',
        email: '',
        password: ''
    })

    const preventDef = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(login(user))
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <article className="auth">
            <form
                className="auth__form"
                onSubmit={preventDef}
            >
                <h1 className="auth__title">Sign in</h1>
                <div className="auth__input-box">
                    <InputElem
                        placeholder="Email"
                        name="username"
                        type="username"
                        onChange={changeHandler}
                        value={user.username}
                    />
                    <InputElem
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={changeHandler}
                        value={user.email}
                    />
                </div>
                <div className="auth__input-box">
                    <InputElem
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={changeHandler}
                        value={user.password}
                    />
                </div>
                <div className="auth__btn-box">
                    <ButtonElem onClick={clickHandler}>Log in</ButtonElem>
                </div>
                <div className="auth__change-auth">
                    <span className="auth__new-user">New user?
                        <span className="auth__create-btn">Create an account</span>
                    </span>
                </div>
            </form>
        </article>
    );
};

export default AuthPage;