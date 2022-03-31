import React, { FC, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import AppRouter from './router/AppRouter'
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { firebaseConfig } from 'firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'hooks/useAuth'
import { useAppDispatch } from 'hooks/reduxHooks'
import { setUser } from 'store/slices/userSlice'
import Preloader from 'components/preloader/Preloader'
import {useAuthState} from 'react-firebase-hooks/auth'

import './styles/style.scss'

const App:FC = () => {
    const [isAuth, setIsAuth] = useState(false)

    const dispatch = useAppDispatch()
    const app = initializeApp(firebaseConfig)
    //const database = getDatabase(app)
    const auth = getAuth()
    const [userData, loading, error] = useAuthState(auth)
    //
    //const user = useAuth()
    //console.log(user)
    //
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            dispatch(setUser({
                email: user.email,
                token: user.refreshToken,
                id: user.uid,
            }))
            setIsAuth(true)
            } else {
            dispatch(setUser({
                email: null,
                token: null,
                id: null,
            }))
            setIsAuth(false)
            }
        })
    }, [auth, dispatch])

    if (loading) {
        return <Preloader/>
    }

    return (
        <>
        <Navbar isAuth={isAuth}/>
        <main className="container">
            <AppRouter isAuth={isAuth}/>
        </main>
        </>
    );
};

export default App;
