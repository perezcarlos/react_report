import React from 'react';
import FeatureList from './FeatureListPane';
import AdditionalInfo from './AdditionalInfoPane';
import SuiteHeader from './SuiteHeaderPane';
import FilterSelector from './FilterSelectorPane';
import uuid from 'uuid';


const SuitePane = ({suite, additionalInfo, onFilterChange, filter}) => {


    const additionalId = `additional-${uuid()}`;
    return(
        <div className="col-md-12">
            {
                Object.keys(suite).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <SuiteHeader additionalInfo={additionalInfo} id={additionalId}/>
                            <FilterSelector onChange={onFilterChange} />
                            <AdditionalInfo additionalInfo={additionalInfo} id={additionalId}/>
                            <FeatureList specs={suite[key]} filter={filter} class="js-features"/>
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
