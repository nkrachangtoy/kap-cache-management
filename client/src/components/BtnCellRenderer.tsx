import React from 'react';
// import KeyValueModal from "./KeyValueModal";
// import Modal from "@material-ui/core/Modal";

const BtnCellRenderer: React.FC = () => {

    const btnClickedHandler = () => {
        console.log('Button is clicked!')
    }

    // const keyValueModal = (
    //     <div className="modal">
    //         <KeyValueModal/>
    //     </div>
    // )
        return (
            <div>
                <button onClick={btnClickedHandler}>Click Me!</button>
                 {/* <Modal open={open} onClose={handleClose}>
                    {keyValueModal}
                 </Modal> */}
            </div>
        );
}

export default BtnCellRenderer;