import React, { Component } from 'react';
import { ButtonGroup, Button} from 'react-bootstrap'


class TabSelectorPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectableTabs: ['features', 'suites']
        };

        this.getTabClass=this.getTabClass.bind(this);
        this.onSelectTab=this.onSelectTab.bind(this);
    }

    getTabClass (tab) {
        if(this.props.selectedTab === tab){
            return("btn btn-default new-suite-tab active")
        } else {
            return("btn btn-default new-suite-tab")
        }
    }

    onSelectTab(event) {
        this.props.onSelectTab(event.currentTarget.value)
    }

    render () {
        return(
            <div className="new-suite-tab-selector">
                <label>Launch new suite by:</label>
                <ButtonGroup className="buttons">
                    {
                        this.state.selectableTabs.map( (tab) => {
                            return(
                                <Button
                                    key={tab}
                                    className={this.getTabClass(tab)}
                                    value={tab}
                                    onClick={this.onSelectTab}
                                >
                                    <span>{tab}</span>
                                </Button>
                            )
                        })
                    }
                </ButtonGroup>
            </div>
        )
    }
};

export default TabSelectorPane;
