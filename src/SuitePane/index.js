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

    var status = 'passed';

    Object.values(suite).find((specs) => {
        Object.values(specs).forEach((spec) => {
            if (spec.status === 'pending'){
                status = 'pending';
            }
            else{
                if (spec.status === 'failed'){
                    status = 'failed';
                }
            }
        });
        return status;
    });

    var status_image = null;

    switch (status) {
        case 'passed':
            status_image = passed;
            break;
        case 'failed':
            status_image = failed;
            break;
        default:
            status_image = pending;
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
