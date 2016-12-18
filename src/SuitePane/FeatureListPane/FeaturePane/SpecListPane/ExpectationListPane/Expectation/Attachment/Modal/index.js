import React from 'react';


const ModalPane = ({attachment, id} ) => {
    return (
        <div className="modal fade" id={id} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <img alt="No attachment found" src={attachment}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPane;
