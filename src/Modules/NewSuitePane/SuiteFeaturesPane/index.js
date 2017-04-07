import React, { Component } from 'react';


class SuiteFeaturesPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFeatures: [],
            features: this.props.features
        };
        this.onSelectFeatures=this.onSelectFeatures.bind(this);
    }

    onSelectFeatures () {

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
                                <input key={`${key}-input`} className={key} type="checkbox"/>
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
