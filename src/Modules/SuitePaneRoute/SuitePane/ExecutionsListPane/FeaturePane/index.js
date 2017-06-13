import React, { Component } from 'react';
import SpecList from './SpecListPane';


class FeaturePane extends Component {

    render () {
        return (
            <div className="spec-group" key={this.props.id}>
                <div className="feature-name">
                    <p><b>{this.props.id}</b> ({Object.values(this.props.specs).length} Specs)</p>
                </div>
                <SpecList
                    key={this.props.id}
                    specs={this.props.specs}
                    onValidate={this.props.onValidate}
                    onSelectedSpec={this.props.onSelectedSpec}
                    selectedSpec={this.props.selectedSpec}
                />
            </div>
        )
    }
};

export default FeaturePane;
