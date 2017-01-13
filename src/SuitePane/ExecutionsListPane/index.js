import React from 'react';
import Feature from './FeaturePane';
import groupBy from 'lodash.groupby';


const ExecutionsListPane = ({specs, filter}) => {
    if(Object.keys(specs).length === 0){
        return(
            <div>
                <h1>No data found</h1>
                <label>Check data and selected suite and build</label>
            </div>

        )
    }
    const byFeature = groupBy(specs, (x) => x[filter]);
    return(
        <div>
            {
                Object.keys(byFeature).map((key) => {
                    return(
                        <Feature key={key} specs={byFeature[key]} id={key} />
                    )
                })
            }
        </div>
    );
};

export default ExecutionsListPane;
