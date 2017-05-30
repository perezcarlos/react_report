import React, {Component} from 'react';
import groupBy from 'lodash.groupby';
import ExecutionsList from './ExecutionsListPane/index';
import AdditionalInfo from './AdditionalInfoPane/index';
import SuiteHeader from './SuiteHeaderPane/index';
import FilterSelector from './FilterSelectorPane/index';
import passed from '../../../Images/passed.png'
import failed from '../../../Images/failed.png'
import pending from '../../../Images/pending.gif'
import warning from '../../../Images/warning.png'
import aborted from '../../../Images/aborted.png'

class SuitePane extends Component {
    constructor (props) {
        super (props);

        this.state = {
            statuses: [],
            failedSpecs: '',
            statusImage: null,
            loadState: 'pending'
        };

        this.getLoadStatus = this.getLoadStatus.bind(this);
        this.getStatusImageByStatuses = this.getStatusImageByStatuses.bind(this);
    }

    componentDidMount () {
        this.getLoadStatus()
    }

    componentDidUpdate (prevProps){
        if (prevProps.suite !== this.props.suite || prevProps.jenkinsInfo !== this.props.jenkinsInfo){
            this.getLoadStatus()
        }
    }

    getStatusImageByStatuses () {
        var statuses = [];
        var status_image = '';
        var failed_specs = [];
        if (this.props.suite) {
            Object.values(this.props.suite).forEach((spec) => {
                statuses.push(spec.status)
            });

            const filtered = groupBy(this.props.suite, (x) => x['status']);
            const specList = [...filtered.failed || [], ...filtered.warning || []];

            failed_specs = specList.map((spec) => spec.file_path);

            if (statuses.some((status) => {return status === 'pending'})) {
                status_image = pending;
            } else if (statuses.some((status) => {return status === 'failed'})) {
                status_image = failed;
            } else if (statuses.some((status) => {return status === 'warning'})) {
                status_image = warning;
            } else {
                status_image = passed
            }

        }

        this.setState({
            statuses: statuses,
            failSpecs: failed_specs,
            statusImage: status_image
        })
    }

    getLoadStatus () {
        if (this.props.suite && JSON.stringify(this.props.suite) !== "{}") {
            this.setState({
                loadState: 'loaded'
            });
            if (this.props.jenkinsInfo && this.props.jenkinsInfo.data) {
                if (this.props.jenkinsInfo.data.building === true) {
                    this.setState({
                        statusImage: pending
                    })
                } else if (this.props.jenkinsInfo.data.result === 'ABORTED') {
                    this.setState({
                        statusImage: aborted
                    })
                } else {
                    this.getStatusImageByStatuses()
                }
            } else {
                this.getStatusImageByStatuses()
            }
        } else if (this.props.jenkinsInfo) {
            if (this.props.jenkinsInfo.error) {
                this.setState({
                    loadState: 'error',
                    statusImage: failed
                })
            } else if (this.props.jenkinsInfo.data.building === true) {
                this.setState({
                    loadState: 'loading',
                    statusImage: pending
                })
            } else if (this.props.jenkinsInfo.data.result === 'ABORTED') {
                this.setState({
                    loadState: 'aborted',
                    statusImage: aborted
                })
            }
        } else {
            this.setState({
                loadState: 'error'
            }, this.getStatusImageByStatuses)
        }
    }


    render () {
        if (!this.props.locationParams) {
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
                            additionalInfo={this.props.additionalInfo}
                            statusImage={this.state.statusImage}
                            loadState={this.state.loadState}
                            locationParams={this.props.locationParams}
                            failedSpecs={this.state.failedSpecs}
                        />
                    </div>
                    <div className="panel-body">
                        <AdditionalInfo additionalInfo={this.props.additionalInfo}/>
                        <FilterSelector
                            onChange={this.props.onFilterChange}
                            filter={this.props.filter}
                            specs={this.props.suite}
                        />
                        <ExecutionsList
                            specs={this.props.suite}
                            filter={this.props.filter}
                            loadState={this.state.loadState}
                            className="executions"
                            onValidate={this.props.onValidate}
                        />
                    </div>
                </div>
            </div>
        )
    }
};

export default SuitePane;
