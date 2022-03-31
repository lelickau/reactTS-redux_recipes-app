import Form from 'components/authForm/Form';
import React, { FC, FormEvent, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from 'store/slices/userSlice';
import { useHistory } from 'react-router';
import { useAppDispatch } from 'hooks/reduxHooks';

import './authPage.scss';

const AuthPage:FC = () => {
    const dispatch = useAppDispatch()
    const {push} = useHistory()

    const [form, setForm] = useState(true)
    const [formText, setFormText] = useState({
        question: 'New user?',
        btnTitle: 'Create an account'
    })

    const preventDefForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const clickHandler = (user:{email: string, password: string, username?:string}) => {
        if (form) {
            clickHandlerLogin(user.email, user.password)
        } else {
            clickHandlerSignup(user.email, user.password)
        }
    }

    const clickHandlerLogin = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            console.log(user)
            dispatch(setUser({
                email: user.email,
                token: user.refreshToken,
                id: user.uid,
            }))
            push('/')
        })
        .catch(console.error)
    }

    const clickHandlerSignup = (email: string, password: string) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            console.log(user)
            dispatch(setUser({
                email: user.email,
                token: user.refreshToken,
                id: user.uid,
            }))
            push('/')
        })
        .catch(console.error)
    }

    const changeForm = () => {
        setForm(!form)
        if (form) {
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
                    <Form
                        title={form ? 'Sign in' : 'Create'}
                        handleClick={clickHandler}
                        isLoginForm={form}
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