import React, { FC, FormEvent, MouseEvent } from 'react';
import ButtonElem from '../../components/UI/button/ButtonElem';
import InputElem from '../../components/UI/input/InputElem';

import './authPage.scss';

const AuthPage:FC = () => {

    const preventDef = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(e.target);
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
                        name="email"
                        type="email"
                        //onChange={changeHandler}
                        //value={inputValue}
                    />
                </div>
                <div className="auth__input-box">
                    <InputElem
                        placeholder="Password"
                        name="password"
                        type="password"
                        //onChange={changeHandler}
                        //value={inputValue}
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