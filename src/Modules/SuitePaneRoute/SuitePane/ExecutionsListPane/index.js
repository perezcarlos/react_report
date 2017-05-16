import React from 'react';
import Feature from './FeaturePane';
import groupBy from 'lodash.groupby';


const ExecutionsListPane = ({specs, filter, onValidate}) => {
    if(Object.keys(specs).length === 0){
        return(
            <div className="error">
                <div className="alert alert-danger">
                    <label>
                        <strong>No data found!</strong>{` Check data and selected suite and build`}
                    </label>
                </div>
            </div>
        )
    }

    const writeFailedSpecsCookie = () => {
        const filtered = groupBy(specs, (x) => x['status']);
        const failedSpecs = [...filtered.failed || [], ...filtered.warning || []];

        const specList = failedSpecs.map( (spec) => spec.file_path );

        var d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();

        document.cookie = 'failedSpecs=' + specList + ";" + expires + ";path=" + window.location.href;
    };

    writeFailedSpecsCookie();
    const byFeature = groupBy(specs, (x) => x[filter.filter]);
    if(filter.subFilter === 'all'){
        return(
            <div className="execution-list">
                {
                    Object.keys(byFeature).map((key) => {
                        return(
                            <Feature
                                key={key}
                                specs={byFeature[key]}
                                id={key}
                                onValidate={onValidate}
                            />
                        )
                    })
                }
            </div>
        )
    } else if(JSON.stringify(Object.keys(byFeature)).indexOf(`"${filter.subFilter}"`) === -1) {
        const error_text = `Filter [${filter.filter}-${filter.subFilter}] is not found for this build`;
        console.error(error_text);
        return (
            <div className="error">
                <div className="alert alert-danger">
                    <label>
                        <strong>Oops!</strong>{` ${error_text}. Please select another one`}
                    </label>
                </div>
            </div>
        )
    }
    else {
        return(
            <Feature
                key={filter.subFilter}
                specs={byFeature[filter.subFilter]}
                id={filter.subFilter}
                onValidate={onValidate}
            />
        )
    }
};

export default ExecutionsListPane;
