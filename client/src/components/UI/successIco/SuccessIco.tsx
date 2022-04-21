import React, { FC } from 'react';

import './successIco.scss';

const SuccessIco: FC = () => {
    return (
        <div className="success-ico">
            <div id="check-part-1" className="success-ico__line1 success-ico__line"></div>
            <div id="check-part-2" className="success-ico__line2 success-ico__line"></div>
        </div>
    );
};

export default SuccessIco;