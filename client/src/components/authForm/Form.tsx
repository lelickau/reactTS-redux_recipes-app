import ButtonElem from 'components/UI/button/ButtonElem';
import InputElem from 'components/UI/input/InputElem';
import { IUser } from 'models/IUser';
import React, {ChangeEvent, FC, useState} from 'react';

import './form.scss'

interface FormItemsProps {
    title: string;
    handleClick: (user:{email: string, password: string, username?:string}) => void;
    isLoginForm: boolean;
}

const Form:FC<FormItemsProps> = ({title, handleClick, isLoginForm}) => {

    const [user, setUser] = useState<IUser>({
        email: '',
        password: ''
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
            <>
                <h1 className="form__title">{!isLoginForm ? 'Create an account' : 'Sign in'}</h1>
                <div className="form__input-box">
                    <InputElem
                        placeholder="Email address"
                        name="email"
                        type="email"
                        onChange={changeHandler}
                        value={user.email}
                    />
                </div>
                <div className="form__input-box">
                    <InputElem
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={changeHandler}
                        value={user.password}
                    />
                </div>
                <div className="form__btn-box">
                    <ButtonElem onClick={() => handleClick(user)}>{title}</ButtonElem>
                </div>
            </>
    );
};

export default Form;