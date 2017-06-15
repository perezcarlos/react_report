import React, {Component} from 'react';
import Expectation from './Expectation/index';
import uuid from 'uuid';


class ExpectationListPane extends Component {
    constructor (props) {
        super (props);

        this.renderListView = this.renderListView
    }

    renderListView () {
        return (
            <tr className="collapse" id={this.props.id}>
                <td colSpan="5">
                    {
                        this.props.expectations.map((expectation) => {
                            var key = uuid();
                            return (
                                <Expectation key={key} expectation={expectation}/>
                            );
                        })
                    }
                </td>
            </tr>
        )
    }

    render () {
        if (this.props.expectations) {
            if (this.props.selectedView === 'list') {
                return this.renderListView()
            }
            return (
                <div>
                    {
                        this.props.expectations.map((expectation) => {
                            var key = uuid();
                            return (
                                <Expectation key={key} expectation={expectation}/>
                            );
                        })
                    }
                </div>
            )
        }
        else {
            return null
        }
    }
}

export default ExpectationListPane;
