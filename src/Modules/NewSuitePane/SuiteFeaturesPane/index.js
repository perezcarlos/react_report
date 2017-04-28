import React, { Component } from 'react';


class SuiteFeaturesPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            features: this.props.features,
            filter: ''
        };
        this.onSelectedFeatures=this.onSelectedFeatures.bind(this);
        this.renderFeaturesBox=this.renderFeaturesBox.bind(this);
        this.buttonClass=this.buttonClass.bind(this);
        this.renderSelectedFeaturesLabel=this.renderSelectedFeaturesLabel.bind(this);
        this.isSelected=this.isSelected.bind(this);
        this.isDisabled=this.isDisabled.bind(this);
        this.onFilter=this.onFilter.bind(this);
    }

    onSelectedFeatures (event) {
        const position = this.props.selectedFeatures.indexOf(event.currentTarget.value);

        if (!~position){
            this.props.selectedFeatures.push(event.currentTarget.value)
        } else if (~position) {
            this.props.selectedFeatures.splice(position, 1);
        }

        this.props.onSelectedFeatures(this.props.selectedFeatures);
    }

    isSelected (feature) {
        return (this.props.selectedFeatures.some( (feat) => feat === feature ))
    }

    isDisabled (feature) {
        if (!this.isSelected(feature) && this.props.selectedFeatures.length === this.props.maxSelectedFeatures){
            return{
                disabled: true
            }
        }
    }

    buttonClass (feature) {
        const base_class = `btn btn-default feature-select-option ${feature}`;
        if(this.isSelected(feature)) {
            return(
                `${base_class} selected`
            )
        } else {
            return(
                base_class
            )
        }
    }

    onFilter (event) {
        this.setState({
            filter: event.currentTarget.value
        })
    }

    renderFeaturesBox () {
        return(
            this.props.features.map((feature) => {
                if(this.state.filter === '') {
                    return (
                        <button
                            className={this.buttonClass(feature)}
                            key={feature}
                            value={feature}
                            onClick={this.onSelectedFeatures}
                            {...this.isDisabled(feature)}
                        >
                            {feature.replace(/_/g, " ")}
                        </button>
                    )
                } else if (feature.includes(this.state.filter)){
                    return (
                        <button
                            className={this.buttonClass(feature)}
                            key={feature}
                            value={feature}
                            onClick={this.onSelectedFeatures}
                            {...this.isDisabled(feature)}
                        >
                            {feature.replace(/_/g, " ")}
                        </button>
                    )
                } else {
                    return null;
                }
            })
        )
    }

    renderSelectedFeaturesLabel () {
        return(
            <label capture="selected-features-count">
                {`${this.props.selectedFeatures.length}/${this.props.maxSelectedFeatures} Max`}
            </label>
        )
    }

    render () {
        if(!this.props.features){
            return(
                <div className="suite-features-pane">
                    <p>No features found check data</p>
                    <div className="features-selection no-suites-found">
                    </div>
                </div>
            )
        }
        return (
            <div className="suite-features-pane">
                <p>Select the features you want to launch: </p>
                {this.renderSelectedFeaturesLabel()}
                <input
                    className="features-filter"
                    type="text" placeholder="Search"
                    onChange={this.onFilter}
                />
                <div className="features-selection">
                    {this.renderFeaturesBox()}
                </div>
            </div>
        )
    }
};

export default SuiteFeaturesPane;
