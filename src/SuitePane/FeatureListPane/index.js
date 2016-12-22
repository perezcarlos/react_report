import React from 'react';
import Feature from './FeaturePane';
import groupBy from 'lodash.groupby';


const FeatureListPane = ({specs, filter}) => {
    const byFeature = groupBy(specs, (x) => x[filter]);
    console.log(byFeature)
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

export default FeatureListPane;
