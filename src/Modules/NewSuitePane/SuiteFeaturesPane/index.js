import React, { Component } from 'react';


class SuiteFeaturesPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFeatures: [],
            features: this.props.features
        };
        this.onSelectedFeatures=this.onSelectedFeatures.bind(this);
        this.renderFeaturesBox=this.renderFeaturesBox.bind(this);
        this.checkboxProperties=this.checkboxProperties.bind(this);
        this.renderSelectedFeaturesLabel=this.renderSelectedFeaturesLabel.bind(this);
        this.isChecked=this.isChecked.bind(this);
        this.isDisabled=this.isDisabled.bind(this);
    }

    onSelectedFeatures (event) {
        const position = this.state.selectedFeatures.indexOf(event.currentTarget.value);
        if(event.currentTarget.checked) {
            if (!~position){
                this.state.selectedFeatures.push(event.currentTarget.value)
            }
        } else {
            if (~position) {
                this.state.selectedFeatures.splice(position, 1);
            }
        }
        this.props.onSelectedFeatures(this.state.selectedFeatures);
    }

    isChecked (feature) {
        return (this.state.selectedFeatures.some( (feat) => feat === feature ))
    }

    isDisabled (feature) {
        return (!this.isChecked(feature) && this.state.selectedFeatures.length === this.props.maxSelectedFeatures)
    }

    checkboxProperties (feature) {
        return {
            checked: this.isChecked(feature),
            disabled: this.isDisabled(feature)
        }
    }

    renderFeaturesBox () {
        return(
            this.props.features.map((feature) => {
                return (
                    <div
                        className={`feature-pair ${feature}`}
                        key={feature}
                        value={feature}
                    >
                        <input
                            key={`${feature}-input`}
                            className={feature}
                            type="checkbox"
                            value={feature}
                            onChange={this.onSelectedFeatures}
                            {...this.checkboxProperties(feature)}
                        />
                        <p
                            key={`${feature}-name`}
                            className={`feature-name ${feature}`}
                        >
                            {feature.replace(/_/g, " ")}
                        </p>
                    </div>
                )
            })
        )
    }

    renderSelectedFeaturesLabel () {
        return(
            <label capture="selected-features-count">
                {`${this.state.selectedFeatures.length}/${this.props.maxSelectedFeatures} Max`}
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
                <div className="features-selection">
                    {this.renderFeaturesBox()}
                </div>
            </div>
        )
    }
};

export default SuiteFeaturesPane;
