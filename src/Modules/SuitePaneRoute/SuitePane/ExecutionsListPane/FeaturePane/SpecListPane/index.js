import React, {Component} from 'react';
import Spec from './SpecPane';
import ExpectationList from './ExpectationListPane';
import uuid from 'uuid';

class SpecListPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            specRows: [],
            selectedSpecs: []
        };

        this.getSpecList=this.getSpecList.bind(this);
        this.onSelectedSpecs=this.onSelectedSpecs.bind(this);
    }

    componentDidMount () {
        this.getSpecList()
    }

    componentDidUpdate (prevProps) {
        if (prevProps.specs !== this.props.specs ) {
            this.getSpecList()
        }
    }

    getSpecList () {
        this.setState ({
            specRows: Object.values(this.props.specs).reduce((memo, item) => {
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
            }, [])
        })
    }

    onSelectedSpecs (selectedSpecs) {
        this.setState({
            selectedSpecs: selectedSpecs
        })
    }

    render () {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th className="validated">Validated</th>
                    <th className="status">Status</th>
                    <th className="spec">Spec</th>
                    <th className="describe">Describe</th>
                    <th className="run-time">Run time</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.specRows.map((item, index) => {
                        if (index % 2 === 0) {
                            return (
                                <Spec
                                    key={`${item.id}-foobar`}
                                    spec={item}
                                    onValidate={this.props.onValidate}
                                    selectedSpecs={this.state.selectedSpecs}
                                    onSelectedSpecs={this.onSelectedSpecs}
                                />
                            );
                        } else {
                            return (
                                <ExpectationList
                                    key={item.id}
                                    spec={item}
                                    expectations={item.expectations}
                                    id={item.id}
                                    selectedSpecs={this.state.selectedSpecs}
                                />
                            );
                        }
                    })
                }
                </tbody>
            </table>
        )
    }
};

export default SpecListPane;
