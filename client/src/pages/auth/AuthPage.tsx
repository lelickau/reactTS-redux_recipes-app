import React, { FC, FormEvent, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from 'store/slices/userSlice';
import { useHistory } from 'react-router';
import { useAppDispatch } from 'hooks/reduxHooks';
import { IUser } from 'models/IUser';
import Form from 'components/authForm/Form';

import './authPage.scss';
import ErrorIco from 'components/UI/errorIco/ErrorIco';

const AuthPage:FC = () => {
    const dispatch = useAppDispatch()
    const {push} = useHistory()

    const [error, setError] = useState('')
    const [isLogin, setLogin] = useState(true)
    const [formText, setFormText] = useState({
        question: 'New user?',
        btnTitle: 'Create an account'
    })

    const preventDefForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const clickHandler = (user:IUser) => {
        if (isLogin) {
            clickHandlerLogin(user.email, user.password)
        } else {
            clickHandlerSignup(user.email, user.password)
        }
    }

    const clickHandlerLogin = (email: string, password: string) => {
        setError('')
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                token: user.refreshToken,
                id: user.uid,
            }))
            push('/')
        })
        .catch((e) => {
            console.log(e)
            setError('Incorrect email or password.')
        })
    }

    const clickHandlerSignup = (email: string, password: string) => {
        setError('')
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                token: user.refreshToken,
                id: user.uid,
            }))
            push('/')
        })
        .catch((e) => {
            console.log(e)
            setError('Something went wrong. Try again later.')
        })
    }

    const changeForm = () => {
        setError('')
        setLogin(!isLogin)
        if (isLogin) {
            setFormText({
                question: 'Already have an account?',
                btnTitle: 'Sign in'
            })
        } else {
            setFormText({
                question: 'New user?',
                btnTitle: 'Create an account'
            })
        }
    }

    return (
        <article className="auth">
            <div className="auth__box">
                <form
                    className="auth__form"
                    onSubmit={preventDefForm}
                >
                    { error &&
                        <div className="auth__form-error">
                            <ErrorIco/>
                            <span className="auth__form-error-text">{error}</span>
                        </div>
                    }
                    <Form
                        title={isLogin ? 'Sign in' : 'Create'}
                        handleClick={clickHandler}
                        isLoginForm={isLogin}
                    />
                </form>
                <div className="auth__change-auth">
                    <span className="auth__new-user">{formText.question}
                        <button
                            className="auth__create-btn"
                            onClick={changeForm}
                        >{formText.btnTitle}</button>
                    </span>
                </div>
            </div>
        </article>
    );
};

export default AuthPage;