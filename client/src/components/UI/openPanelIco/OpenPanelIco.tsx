import React, { FC } from 'react'
import './openPanelIco.scss'

interface OpenPanelIcoProps {
    isOpenPanel: boolean;
}

const OpenPanelIco: FC <OpenPanelIcoProps> = ({isOpenPanel}) => {
    return (
        <span className={isOpenPanel ? "open-ico open-ico--active" : 'open-ico'}></span>
    );
};

export default OpenPanelIco;