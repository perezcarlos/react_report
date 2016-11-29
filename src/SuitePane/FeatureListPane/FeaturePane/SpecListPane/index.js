import React from 'react';
import Spec from './SpecPane';
import ExpectationList from './ExpectationListPane';
import uuid from 'uuid'

const SpecListPane = ({specs} ) => {
    const specRows = Object.values(specs).reduce((memo, item) => {
        const id = `test-${uuid()}`;
        memo.push({
            id: id,
            ...item
        });
        memo.push({
            id: id,
            ...item
        });
        return memo
    }, []);
    return(
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Status</th>
                <th>Spec</th>
                <th>Describe</th>
                <th>Run time</th>
            </tr>
            </thead>
            <tbody>
            {
                specRows.map((item, index) => {
                    if (index % 2 === 0) {
                        return(
                            <Spec key={`${item.id}-foobar`} spec={item} />
                        );
                    } else {
                        return (
                            <ExpectationList key={item.id} expectations={item.expectations} id={item.id}/>
                        );
                    }
                })
            }
            </tbody>
        </table>
    );
};

export default SpecListPane;
