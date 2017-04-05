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
            <span className="suite-title h1">{additionalInfo.suite || "ERROR"}</span>
            <span className="build-number h4">{`\t#${additionalInfo.build}`}</span>
        </div>
    )
};

export default SuiteHeaderPane;
