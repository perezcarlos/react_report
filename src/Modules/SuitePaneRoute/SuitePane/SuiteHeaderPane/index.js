import React from 'react';


const SuiteHeaderPane = ({additionalInfo}) => {
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
        </div>
    )
};

export default SuiteHeaderPane;
