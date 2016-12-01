import React from 'react';


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
    return(
        <div className={`alert alert-${expectation_class}`}>{expectation.description}</div>
    );
};

export default ExpectationPane;
