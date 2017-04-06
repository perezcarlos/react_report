import React from 'react';


const SuiteHeaderPane = ({additionalInfo, status_image}) => {
    if (!additionalInfo){
        return(
            <div className="suite-header panel-title">
                <h1>Suite</h1>
            </div>
        )
    } else {
        return(
            <div className="suite-header panel-title">
                <img className="status-image" src={status_image} alt="" />
                <span className="suite-title h1">{additionalInfo.suite || "ERROR"}</span>
                <span className="build-number h4">{`\t#${additionalInfo.build}`}</span>
            </div>
        )
    }
};

export default SuiteHeaderPane;
