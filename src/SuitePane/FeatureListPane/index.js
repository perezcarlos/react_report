import React from 'react';
import Feature from './FeaturePane';
import groupBy from 'lodash.groupby';


const ExecutionsListPane = ({specs, filter}) => {
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
