import React from 'react';
import Feature from './FeaturePane';
import groupBy from 'lodash.groupby';


const ExecutionsListPane = ({specs, filter, onValidate}) => {
    if(Object.keys(specs).length === 0){
        return(
            <div>
                <h1>No data found</h1>
                <label>Check data and selected suite and build</label>
            </div>

        )
    }
    const byFeature = groupBy(specs, (x) => x[filter.filter]);
    if(filter.subFilter === 'all'){
        return(
            <div>
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
    } else if(JSON.stringify(Object.keys(byFeature)).indexOf(filter.subFilter) === -1) {
        const error_text = `Subfilter [${filter.subFilter}] is not found for this build`;
        console.error(error_text);
        return (
            <div className="error">
                <p>{`Subfilter [${filter.subFilter}] is not found for this build.`}</p>
                <p>Please select another subfilter</p>
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
