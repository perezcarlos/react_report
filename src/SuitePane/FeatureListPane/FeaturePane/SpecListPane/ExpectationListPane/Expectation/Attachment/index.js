import React from 'react';
import uuid from 'uuid';
import Modal from './Modal';


const AttachmentPane = ({attachment, id} ) => {
    const modalId = `modal-${uuid()}`;
    return (
        <div id={id} className="collapse">
            <a className="thumbnail" href="#" data-toggle="modal" data-target={`#${modalId}`} >
                <img alt="No attachment found" src={attachment}/>
            </a>
            <Modal key={modalId} attachment={attachment} id={modalId} />
        </div>
    );
};

export default AttachmentPane;
