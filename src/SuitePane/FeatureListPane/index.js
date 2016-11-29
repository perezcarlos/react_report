import React from 'react';
import Feature from './FeaturePane'


const FeatureListPane = ({features}) => {
    return(
        <div>
            {
                Object.keys(features).map((key) => {
                    return(
                        <Feature key={key} specs={features[key]} id={key} />
                    )
                })
            }
        </div>
    );
};

export default FeatureListPane;
