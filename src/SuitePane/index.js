import React from 'react';
import FeatureList from './FeatureListPane';
import AdditionalInfo from './AdditionalInfoPane';
import SuiteHeader from './SuiteHeaderPane';
import uuid from 'uuid';


const SuitePane = ({suite, additionalInfo}) => {
    const additionalId = `additional-${uuid()}`;
    return(
        <div className="col-md-12">
            {
                Object.keys(suite).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <SuiteHeader additionalInfo={additionalInfo} id={additionalId}/>
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
