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

    renderFeaturesBox () {
        return(
            Object.keys(this.props.features).map((key) => {
                return (
                    <div className={`feature-pair ${key}`} key={key}>
                        <input
                            key={`${key}-input`}
                            className={key}
                            type="checkbox"
                            value={key}
                            onChange={this.onSelectedFeatures}
                            />
                        <p
                            key={`${key}-name`}
                            className={`feature-name ${key}`}
                        >
                            {key}
                        </p>
                        <p key={`specs-number ${key}-specs`}>
                            {`${this.props.features[key].specs_number} specs`}
                        </p>
                    </div>
                )
            })
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
                <div className="features-selection">
                    {this.renderFeaturesBox()}
                </div>
            </div>
        )
    }
};

export default SuiteFeaturesPane;
