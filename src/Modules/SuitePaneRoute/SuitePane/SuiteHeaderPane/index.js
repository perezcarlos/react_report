import React from 'react';
import jenkins from './../../../../jenkins';


const SuiteHeaderPane = ({additionalInfo, status_image}) => {

    const onRebuild = () => {
        return (
            jenkins.rebuild(additionalInfo, (error, response) => {
                if (error) {
                    console.log("There is an error", error)
                }
                else {
                    console.log("The response is", response)
                }
            })
        )
    };

    const renderRebuild = () => {
      return (
          <div className="rebuild-pane">
              <button className="btn btn-default" onClick={onRebuild}>
                  Rebuild
              </button>
          </div>
      )
    };

    const renderRetried = () => {
        if (additionalInfo.retried === "true") {
            return (
                <i
                    className="retried glyphicon glyphicon-repeat"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Retried execution"
                />
            )
        } else {
            return null
        }
    };

    if (!additionalInfo){
        return(
            <div className="suite-header panel-title">
                <h1>Suite</h1>
            </div>
        )
    } else {
        return(
            <div>
                <div className="suite-header panel-title">
                    <img className="status-image" src={status_image} alt="" />
                    <span className="suite-title h1">{additionalInfo.suite || "ERROR"}</span>
                    <span className="build-number h4">{`\t#${additionalInfo.build}`}</span>
                    {renderRetried()}
                </div>
                {renderRebuild()}
            </div>
        )
    }
};

export default SuiteHeaderPane;
