import ButtonElem from 'components/UI/button/ButtonElem';
import EyeIco from 'components/UI/eyeIco/EyeIco';
import InputElem from 'components/UI/input/InputElem';
import ValidateMessage from 'components/UI/validateMessage/ValidateMessage';
import { useInput } from 'hooks/useInput';
import React, {ChangeEvent, FC, FocusEvent, MouseEvent, useState} from 'react';

import './form.scss'

interface FormItemsProps {
    title: string;
    handleClick: (user:{email: string, password: string}) => void;
    isLoginForm: boolean;
}

const Form:FC<FormItemsProps> = ({title, handleClick, isLoginForm}) => {
    const [show, setShow] = useState(false)
    const showPassword = (e: MouseEvent<HTMLDivElement>) => {
        setShow(!show)
    }
    // email
    const email = useInput('', {isEmpty: true, minLength: 7, isEmail: false})

    const changeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        email.onChange(e)
    }

    const blurHandlerEmail = (e: FocusEvent<HTMLInputElement>) => {
        email.onBlur(e)
    }
    // pass
    const password = useInput('', {isEmpty: true, minLength: 6})

    const changeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        password.onChange(e)
    }

    const blurHandlerPassword = (e: FocusEvent<HTMLInputElement>) => {
        password.onBlur(e)
    }

    // send
    const sendForm = () => {
        handleClick({email: email.value, password: password.value})
    }
    return (
            <>
                <h1 className="form__title">{!isLoginForm ? 'Create an account' : 'Sign in'}</h1>
                <div className="form__input-box">
                    {(email.isDirty && email.isEmpty) && <ValidateMessage message='*Enter the Email'/>}
                    {(email.emailErr && !email.isEmpty)&& <ValidateMessage message='*Incorrect Email'/>}
                    <InputElem
                        placeholder="Email address"
                        name="email"
                        type="email"
                        onChange={changeHandlerEmail}
                        value={email.value}
                        onBlur={blurHandlerEmail}
                    />
                </div>
                <div className="form__input-box">
                {(password.isDirty && password.isEmpty) && <ValidateMessage message='*Enter the password'/>}
                {(password.minLengthErr && !password.isEmpty && password.isDirty) && <ValidateMessage message='*Enter the password (at least 6 characters)'/>}
                    <InputElem
                        placeholder="Password"
                        name="password"
                        type={show ? 'text' : "password"}
                        onChange={changeHandlerPassword}
                        value={password.value}
                        onBlur={blurHandlerPassword}
                    />
                    <div className="form__show-pass" onClick={showPassword}>
                        <EyeIco isOpen={show}/>
                    </div>
                </div>
                <div className="form__btn-box">
                    <ButtonElem onClick={sendForm}>{title}</ButtonElem>
                </div>
            </>
    );
};

export default Form;