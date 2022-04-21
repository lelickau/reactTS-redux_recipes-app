import React, { FC, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import AppRouter from './router/AppRouter'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch } from 'hooks/reduxHooks'
import { setUser } from 'store/slices/userSlice'
import Preloader from 'components/preloader/Preloader'
import {useAuthState} from 'react-firebase-hooks/auth'

import './styles/style.scss'
import { getFavoritesRecipes } from 'store/slices/favoritesSlice'
import { getMyRecipes } from 'store/slices/myRecipesSlice'

const App:FC = () => {
    const dispatch = useAppDispatch()
    const [isAuth, setIsAuth] = useState(false)

    const auth = getAuth()
    const [, loading] = useAuthState(auth)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    email: user.email,
                    token: user.refreshToken,
                    id: user.uid,
                }))
                setIsAuth(true)
                dispatch(getFavoritesRecipes(user.uid))
                dispatch(getMyRecipes(user.uid))
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
