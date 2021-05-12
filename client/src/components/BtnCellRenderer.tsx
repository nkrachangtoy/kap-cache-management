import React from 'react';
// import KeyValueModal from "./KeyValueModal";
import Modal from "@material-ui/core/Modal";
import InfoIcon from '@material-ui/icons/Info';

const BtnCellRenderer: React.FC = () => {

    const btnClickedHandler = () => {
        // handleGetKeyValue()
    }

    const keyValueModal = (
        <div className="modal">
            <p></p>
        </div>
    )
        return (
            <div>
                <a onClick={btnClickedHandler} className="keyValueModal__button"><InfoIcon /></a>
                 {/* <Modal open={open} onClose={handleClose}>
                    {keyValueModal}
                 </Modal> */}
            </div>
        );
}

export default BtnCellRenderer;