import React, {Component} from 'react';
import Validated from './ValidatedPane';
import AdditionalSpecInfo from './AdditionalSpecInfoPane';
import ExpectationsList from './ExpectationListPane';

class SpecDetailPane extends Component {

    render () {
        if (this.props.loadState === "pending" || this.props.loadState === "error") {
            return null
        } else if (!this.props.spec) {
            return (
                <div className="spec-detail">
                    <div className="no-spec-selected">
                        <h1>No spec has been selected</h1>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="spec-detail">
                    <div className="selected-spec">
                        <Validated
                            spec={this.props.spec}
                            onValidate={this.props.onValidate}
                        />
                        <h2 className="spec-name">{this.props.spec.name.replace(/[_-]/g, ' ')}</h2>
                        <p className="spec-description">{this.props.spec.description}</p>
                        <AdditionalSpecInfo additionalInfo={this.props.spec.additional_spec_info}/>
                        <ExpectationsList expectations={this.props.spec.expectations}/>
                    </div>
                </div>
            )
        }
    }
};

export default SpecDetailPane;
