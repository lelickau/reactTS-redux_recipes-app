import React, { FC, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import AppRouter from './router/AppRouter'
import { initializeApp } from "firebase/app"
import { db, firebaseConfig } from 'firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'hooks/useAuth'
import { useAppDispatch } from 'hooks/reduxHooks'
import { setUser } from 'store/slices/userSlice'
import Preloader from 'components/preloader/Preloader'
import {useAuthState} from 'react-firebase-hooks/auth'

//import { getDatabase, ref, set, onValue } from "firebase/database"
import { getFirestore, collection, getDocs } from "firebase/firestore"

import './styles/style.scss'
import { getFavoritesRecipes } from 'store/slices/favoritesSlice'

const App:FC = () => {
    const dispatch = useAppDispatch()
    const [isAuth, setIsAuth] = useState(false)

    //const app = initializeApp(firebaseConfig)
    const auth = getAuth()
    const [userData, loading, error] = useAuthState(auth)

//db

// read

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
            dispatch(getFavoritesRecipes())
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
        return <Preloader isLocal={false}/>
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
