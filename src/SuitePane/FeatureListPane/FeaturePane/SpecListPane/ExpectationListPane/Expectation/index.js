import React from 'react';
import uuid from 'uuid';
import Exception from './Exception';
import Backtrace from './Bactrace';
import Attachment from './Attachment';


const ExpectationPane = ({expectation} ) => {
    var expectation_class;
    switch (expectation.status) {
        case 'failed':
            expectation_class = "warning";
            break;
        case "passed":
            expectation_class = "success";
            break;
        default :
            expectation_class = "error";

    }
        if (!expectation.exception){
            const attachmentId = `attachment-${uuid()}`;
            return(
                <div className={`alert alert-${expectation_class}`}>
                    <label data-toggle="collapse" href={`#${attachmentId}`}>{expectation.description}</label>
                    <Attachment key={attachmentId} attachment={expectation.remote_attachment} id={attachmentId}/>
                </div>
            );
        } else {
            const attachmentId = `attachment-${uuid()}`;
            const backtraceId = `backtrace-${uuid()}`;
            return(
                <div className={`alert alert-${expectation_class}`}>
                    <label data-toggle="collapse" href={`#${attachmentId}`}>{expectation.description}</label>
                    <Exception key={backtraceId} exception={expectation.exception} id={backtraceId}/>
                    <Backtrace key={`${backtraceId}-2`} backtrace={expectation.exception_backtrace} id={backtraceId}/>
                    <Attachment key={attachmentId} attachment={expectation.remote_attachment} id={attachmentId}/>
                </div>
            )
        }
};

export default ExpectationPane;
