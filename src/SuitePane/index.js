import React from 'react';
import FeatureList from './FeatureListPane';
import AdditionalInfo from './AdditionalInfoPane';
import uuid from 'uuid';


const SuitePane = ({suite, additionalInfo}) => {
    const additionalId = `additional-${uuid()}`;
    return(
        <div className="col-md-12">
            {
                Object.keys(suite).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <div className="suite-header">
                                <h1>{`${key}. `}</h1>
                                <a href={`#${additionalId}`} data-toggle="collapse">Show more info</a>
                            </div>
                            <AdditionalInfo additionalInfo={additionalInfo} id={additionalId}/>
                            <FeatureList features={suite[key]} class="js-features"/>
                        </div>
                    );
                })
            }
        </div>
    )
};

SuitePane.defaultProps = {
    suite: {}
};

export default SuitePane;
