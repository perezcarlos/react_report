import React from 'react';
import Expectation from './Expectation';
import uuid from 'uuid';


const ExpectationListPane = ({expectations = [], id} ) => {
    return(
        <tr className="collapse" id={id}>
            <td colSpan="4">
            {
                expectations.map((expectation) => {
                    var key = uuid()
                    return(
                        <Expectation key={key} expectation={expectation}/>
                    );
                })
            }
            </td>
        </tr>
    );
};

export default ExpectationListPane;
