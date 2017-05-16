import React from 'react';
import groupBy from 'lodash.groupby';
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
    var failedSpecs = '';

    if(suite) {
        Object.values(suite).forEach((spec) => {
            statuses.push(spec.status)
        });

        const filtered = groupBy(suite, (x) => x['status']);
        const specList = [...filtered.failed || [], ...filtered.warning || []];

        failedSpecs = specList.map( (spec) => spec.file_path )
    }

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

    if(!suite){
        return (
            <div className="suite-pane col-md-12">
                <div className="no-suite-loaded">
                    <h1>No suite has been selected</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="suite-pane col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <SuiteHeader
                        additionalInfo={additionalInfo}
                        status_image={status_image}
                        failedSpecs={failedSpecs}
                    />
                </div>
                <div className="panel-body">
                    <AdditionalInfo additionalInfo={additionalInfo}/>
                    <FilterSelector
                        onChange={onFilterChange}
                        filter={filter}
                        specs={suite}
                    />
                    <ExecutionsList
                        specs={suite}
                        filter={filter}
                        className="executions"
                        onValidate={onValidate}
                    />
                </div>
            </div>
        </div>
    )
};

SuitePane.defaultProps = {
    suite: {}
};

export default SuitePane;
