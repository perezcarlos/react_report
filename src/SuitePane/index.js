import React from 'react';
import ExecutionsList from './FeatureListPane';
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
                            <AdditionalInfo additionalInfo={additionalInfo} id={additionalId}/>
                            <FilterSelector onChange={onFilterChange} />
                            <ExecutionsList specs={suite[key]} filter={filter} class="executions"/>
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
