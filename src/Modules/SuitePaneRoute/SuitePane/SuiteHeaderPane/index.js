import React from 'react';
import jenkins from './../../../../jenkins';


const SuiteHeaderPane = ({additionalInfo, status_image}) => {

    const getFailedSpecsCookie = () => {
        var name = 'failedSpecs=';
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

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

    const onRebuildFailed = () => {
        const params = Object.assign({}, additionalInfo, {
            failedSpecs: getFailedSpecsCookie()
        });
        return (
            jenkins.rebuildFailed(params, (error, response) => {
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
          <div className="rebuild-pane btn-group">
              <button className="btn btn-default" onClick={onRebuildFailed}>
                  Rebuild Failed
              </button>
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
