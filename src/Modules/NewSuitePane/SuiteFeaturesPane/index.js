import React, { Component } from 'react';
import { ButtonGroup, Button, FormGroup, FormControl } from 'react-bootstrap'


class SuiteFeaturesPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            features: this.props.features
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
        const base_class = `feature-select-option ${feature}`;
        if(this.isSelected(feature)) {
            return(
                `${base_class} active`
            )
        } else {
            return(
                base_class
            )
        }
    }

    onFilter (event) {
        this.props.onFilter(event.currentTarget.value)
    }

    renderFeaturesBox () {
        const filter = this.props.filter;
        const filterMatcher = new RegExp(`^${filter}| ${filter}`, 'g');

        return(
            <ButtonGroup>
                {
                    this.props.features.sort().map((feature) => {
                        const shownFeature = feature.replace(/_/g, " ");
                        if (this.props.filter === '') {
                            return (
                                <Button
                                    className={this.buttonClass(feature)}
                                    key={feature}
                                    value={feature}
                                    onClick={this.onSelectedFeatures}
                                    {...this.isDisabled(feature)}
                                >
                                    {shownFeature}
                                </Button>
                            )
                        } else if (shownFeature.match(filterMatcher)) {
                            return (
                                <Button
                                    className={this.buttonClass(feature)}
                                    key={feature}
                                    value={feature}
                                    onClick={this.onSelectedFeatures}
                                    {...this.isDisabled(feature)}
                                >
                                    {shownFeature}
                                </Button>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </ButtonGroup>
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
                <FormGroup>
                    <FormControl
                        type="text" placeholder="Search"
                        onChange={this.onFilter}
                        value={this.props.filter}
                        className="search-filter"
                    />
                </FormGroup>
                <div className="features-selection">
                    {this.renderFeaturesBox()}
                </div>
            </div>
        )
    }
};

export default SuiteFeaturesPane;
