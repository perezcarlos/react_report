import React, {Component} from 'react';
import Feature from './FeaturePane';
import groupBy from 'lodash.groupby';


class ExecutionsListPane extends Component {
    constructor (props) {
        super (props);
        
        this.state = ({
            filteredSpecs: null
        });
        
        this.getFilteredSpecs=this.getFilteredSpecs.bind(this)
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

    render () {
        if (!this.state.filteredSpecs) {
            return (
                <div className="error">
                    <div className="alert alert-info">
                        <label>
                            <strong>Wait</strong>{` for data to be loaded`}
                        </label>
                    </div>
                </div>
            )
        }

        if (Object.keys(this.state.filteredSpecs).length === 0) {
            return (
                <div className="error">
                    <div className="alert alert-danger">
                        <label>
                            <strong>No data found!</strong>{` Check data and selected suite and build`}
                        </label>
                    </div>
                </div>
            )
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
                    <div className="alert alert-danger">
                        <label>
                            <strong>Oops!</strong>{` ${error_text}. Please select another one`}
                        </label>
                    </div>
                </div>
            )
        } else {
            return (
                <Feature
                    key={this.props.filter.subFilter}
                    specs={this.state.filteredSpecs[this.props.filter.subFilter]}
                    id={this.props.filter.subFilter}
                    onValidate={this.props.onValidate}
                />
            )
        }
    }
};

export default ExecutionsListPane;
