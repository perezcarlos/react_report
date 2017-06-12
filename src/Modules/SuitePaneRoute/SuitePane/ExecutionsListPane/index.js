import React, {Component} from 'react';
import { Alert } from 'react-bootstrap';
import Feature from './FeaturePane';
import { groupBy } from 'lodash';


class ExecutionsListPane extends Component {
    constructor (props) {
        super (props);
        
        this.state = ({
            filteredSpecs: null
        });
        
        this.getFilteredSpecs=this.getFilteredSpecs.bind(this);
        this.errorsRender=this.errorsRender.bind(this);
    }
    
    componentDidMount () {
        this.getFilteredSpecs()
    }
    
    componentDidUpdate (prevProps) {
        if (prevProps.specs !== this.props.specs || prevProps.filter !== this.props.filter) {
            this.getFilteredSpecs()
        }
    }
    
    getFilteredSpecs () {
        var filtered = null;
        
        if (this.props.specs) {
            filtered = groupBy(this.props.specs, (x) => x[this.props.filter.filter]);
        } else {
            filtered = this.props.specs
        }
        
        this.setState({
            filteredSpecs: filtered
        })
    }

    errorsRender () {
        if (this.props.loadState === 'loading') {
            return (
                <div className="error">
                    <Alert bsStyle="info">
                        <label>
                            <strong>Wait</strong>{` for data to be loaded`}
                        </label>
                    </Alert>
                </div>
            )
        } else if (this.props.loadState === 'aborted') {
            return (
                <div className="error">
                    <Alert bsStyle="danger">
                        <label>
                            <strong>No data found!</strong>{` Job could be aborted, check for jenkins job`}
                        </label>
                    </Alert>
                </div>
            )
        }
        else {
            return (
                <div className="error">
                    <Alert bsStyle="danger">
                        <label>
                            <strong>No data found!</strong>{` Check data and selected suite and build`}
                        </label>
                    </Alert>
                </div>
            )
        }
    }

    render () {
        if (!this.state.filteredSpecs || Object.keys(this.state.filteredSpecs).length === 0) {
            return this.errorsRender()
        }
        if (this.props.filter.subFilter === 'all') {
            return (
                <div className="execution-list">
                    {
                        Object.keys(this.state.filteredSpecs).map((key) => {
                            return (
                                <Feature
                                    key={key}
                                    specs={this.state.filteredSpecs[key]}
                                    id={key}
                                    onValidate={this.props.onValidate}
                                    selectedSpec={this.props.selectedSpec}
                                    onSelectedSpec={this.props.onSelectedSpec}
                                />
                            )
                        })
                    }
                </div>
            )
        } else if (JSON.stringify(Object.keys(this.state.filteredSpecs)).indexOf(`"${this.props.filter.subFilter}"`) === -1) {
            const error_text = `Filter [${this.props.filter.filter}-${this.props.filter.subFilter}] is not found for this build`;
            console.error(error_text);
            return (
                <div className="error">
                    <Alert bsStyle="danger">
                        <label>
                            <strong>Oops!</strong>{` ${error_text}. Please select another one`}
                        </label>
                    </Alert>
                </div>
            )
        } else {
            return (
                <div className="execution-list">
                    <Feature
                        key={this.props.filter.subFilter}
                        specs={this.state.filteredSpecs[this.props.filter.subFilter]}
                        id={this.props.filter.subFilter}
                        onValidate={this.props.onValidate}
                        selectedSpec={this.props.selectedSpec}
                        onSelectedSpec={this.props.onSelectedSpec}
                    />
                </div>
            )
        }
    }
};

export default ExecutionsListPane;
