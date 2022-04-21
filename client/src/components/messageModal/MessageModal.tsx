import ErrorIco from "components/UI/errorIco/ErrorIco";
import SuccessIco from "components/UI/successIco/SuccessIco"
import React, { FC } from "react"

import './messageModal.scss'

interface MessageModalProps {
    status: string | null;
    setCloseModal: () => void;
    successMessage: string;
    errorMessage: string;
}

const MessageModal: FC<MessageModalProps> = ({
        status,
        setCloseModal,
        successMessage,
        errorMessage
    }) => {

    return (
        <div
                className={`
                    modal__message
                    ${(status === 'resolve' || status === 'rejected') && 'modal__message--active'}
                `}>
                <div className="modal__content-box">
                    <div onClick={setCloseModal} className="modal__close"></div>
                    {
                        status === 'resolve' &&
                        <div className="modal__content-item">
                            <SuccessIco/>
                            <div className="modal__message-text">{successMessage}</div>
                        </div>
                    }
                    {
                        status === 'rejected' &&
                        <div className="modal__content-item">
                            <ErrorIco/>
                            <div className="modal__message-text">{errorMessage}</div>
                        </div>
                    }
                </div>
            </div>
    )
}

export default MessageModal