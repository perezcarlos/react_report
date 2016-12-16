import React from 'react';
import uuid from 'uuid';


const AttachmentPane = ({attachment, id} ) => {
    const modalId = `modal-${uuid()}`;
    return (
        <div id={id} className="collapse">
            <a className="thumbnail" href="#" data-toggle="modal" data-target={`#${modalId}`} >
                <img src={attachment}/>
            </a>
            <div className="modal fade" id={modalId} role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <img src={attachment}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttachmentPane;
