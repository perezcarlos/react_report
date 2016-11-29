import React from 'react';
import FeatureList from './FeatureListPane'


const SuitePane = ({suite}) => {
    console.log("Suite pane receives", suite)
    return(
        <div className="col-md-12">
            {
                Object.keys(suite).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <h1>{key}</h1>
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

//SuitePane.propTypes = {
//    suite: React.PropTypes.hash.isRequired
//}

export default SuitePane;
