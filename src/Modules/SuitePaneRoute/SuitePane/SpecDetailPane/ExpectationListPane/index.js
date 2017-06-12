import React, {Component} from 'react';
import Expectation from './Expectation/index';
import uuid from 'uuid';


class ExpectationListPane extends Component {

    render () {
        if (this.props.expectations) {
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
