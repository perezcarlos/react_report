import React from 'react';
import ExecutionsList from './ExecutionsListPane';
import AdditionalInfo from './AdditionalInfoPane';
import SuiteHeader from './SuiteHeaderPane';
import FilterSelector from './FilterSelectorPane';
import passed from '../Images/passed.png'
import failed from '../Images/failed.png'
import pending from '../Images/pending.gif'
import uuid from 'uuid';


const SuitePane = ({suite, additionalInfo, onFilterChange, filter}) => {

    var statuses = [];

    Object.values(suite).find((specs) => {
        Object.values(specs).forEach((spec) => {
            statuses.push(spec.status)
        });
        return status;
    });

    var status_image = null;

    if (statuses.some((status) => { return status === 'pending'})) {
        status_image = pending;
    } else if (statuses.some((status) => {return status === 'failed'})) {
        status_image = failed;
    } else {
        status_image = passed;
    }

    const additionalId = `additional-${uuid()}`;
    return(
        <div className="col-md-12">
            {
                Object.keys(suite).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <img className="status-image" src={status_image} alt="" />
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
