import React from 'react';
import uuid from 'uuid';
import Exception from './Exception';
import Bacstrace from './Bactrace';


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
            return(
                <div className={`alert alert-${expectation_class}`}>
                    <p>{expectation.description}</p>
                </div>
            );
        } else {
            const id = `test-${uuid()}`;
            return(
                <div className={`alert alert-${expectation_class}`}>
                    <p>{expectation.description}</p>
                    <Exception key={id} exception={expectation.exception} id={id}/>
                    <Bacstrace key={`${id}-2`} backtrace={expectation.exception_backtrace} id={id} />
                </div>
            )
        }
};

export default ExpectationPane;
