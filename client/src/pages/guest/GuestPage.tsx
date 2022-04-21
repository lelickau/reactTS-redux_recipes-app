import ButtonElem from 'components/UI/button/ButtonElem'
import React, { FC } from 'react';

import './guest.scss'
import bgImg from 'resources/img/bg-guest.png'

const bgStyleImg = {
    backgroundImage: `url(${bgImg})`
}
const GuestPage: FC = () => {
    return (
        <section className="guest" style={bgStyleImg}>
            <article className="guest__content">
                <h1 className="guest__title">
                    You`ll find <br/>
                    deliciouse & <br/>
                    healthy food
                </h1>
                <p className="guest__text">
                Find and share everyday cooking inspiration. Search over 1.5 million recipes. We add new sites and recipes continuously. 500+ top web recipe sources - Our search algorithm returns the most relevant recipes from the most popular and best recipes sources on the web.
                </p>
                <ButtonElem>Sign in</ButtonElem>
            </article>
        </section>
    );
};

export default GuestPage;