import { useAuth } from 'hooks/useAuth';
import React, { FC } from 'react';

import './favoritesPage.scss';

const FavoritesPage:FC = () => {
    const {email} = useAuth()

    return (
        <article className="favs">
            <h2>{email}</h2>
        </article>
    );
};

export default FavoritesPage;