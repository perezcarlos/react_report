import React, {Component} from 'react';
import Expectation from './Expectation';
import uuid from 'uuid';


class ExpectationListPane extends Component {
    constructor(props){
        super(props)

        this.onSelected=this.onSelected.bind(this)
    }

    onSelected () {
        return null
    }

    render () {
        return(
            <tr className="collapse" id={this.props.id}>
                <td colSpan="4">
                    {
                        this.props.expectations.map((expectation) => {
                            var key = uuid();
                            return(
                                <Expectation key={key} expectation={expectation}/>
                            );
                        })
                    }
                </td>
            </tr>
        )
    }
}

export default ExpectationListPane;
