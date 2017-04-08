import React, { Component } from 'react';


class SuiteFeaturesPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFeatures: [],
            features: this.props.features
        };
        this.onSelectedFeatures=this.onSelectedFeatures.bind(this);
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

    render () {
        return (
            <div className="suite-features-pane">
                <label>Select the features you want to launch</label>
                <div className="features-selection">
                {
                    Object.keys(this.props.features).map((key) => {
                        return (
                            <div key={key}>
                                <input
                                    key={`${key}-input`}
                                    className={key}
                                    type="checkbox"
                                    value={key}
                                    onChange={this.onSelectedFeatures}
                                />
                                <p key={`${key}-text`} className={key}>{key}</p>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
};

export default SuiteFeaturesPane;
