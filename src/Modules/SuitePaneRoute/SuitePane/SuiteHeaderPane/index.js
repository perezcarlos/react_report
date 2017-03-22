import React from 'react';


const SuiteHeaderPane = ({id, additionalInfo}) => {
    if (!additionalInfo){
        return(
            <div className="suite-header">
                <h1>Suite</h1>
            </div>
        )
    }
    return(
        <div className="suite-header">
            <h1>{additionalInfo.suite || "ERROR"}</h1>
            <a href={`#${id}`} data-toggle="collapse">Show more info</a>
        </div>
    )
};

export default SuiteHeaderPane;
