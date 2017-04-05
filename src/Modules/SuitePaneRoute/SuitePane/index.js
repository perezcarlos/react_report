import React from 'react';
import ExecutionsList from './ExecutionsListPane/index';
import AdditionalInfo from './AdditionalInfoPane/index';
import SuiteHeader from './SuiteHeaderPane/index';
import FilterSelector from './FilterSelectorPane/index';
import passed from '../../../Images/passed.png'
import failed from '../../../Images/failed.png'
import warning from '../../../Images/warning.png'
import pending from '../../../Images/pending.gif'


const SuitePane = ({suite, additionalInfo, onFilterChange, filter, onValidate}) => {

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
    } else if (statuses.some((status) => {return status === 'warning'})) {
        status_image = warning;
    } else {
        status_image = passed;
    }

    return(
        <div className="col-md-12">
            {
                Object.keys(suite).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <img className="status-image" src={status_image} alt="" />
                            <SuiteHeader additionalInfo={additionalInfo}/>
                            <AdditionalInfo additionalInfo={additionalInfo}/>
                            <FilterSelector
                                onChange={onFilterChange}
                                filter={filter}
                                specs={suite[key]}
                            />
                            <ExecutionsList
                                specs={suite[key]}
                                filter={filter}
                                className="executions"
                                onValidate={onValidate}
                            />
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
