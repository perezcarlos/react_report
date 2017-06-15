import React, {Component} from 'react';
import { ListGroup } from 'react-bootstrap';
import uuid from 'uuid';
import Spec from './SpecPane/index';
import ExpectationList from '../../../SpecDetailPane/ExpectationListPane';

class SpecListPane extends Component {
    constructor (props) {
        super(props);

        this.state = {
            specRows: []
        };

        this.getSpecList=this.getSpecList.bind(this);
        this.renderListView=this.renderListView.bind(this);
    }

    componentDidMount () {
        this.getSpecList()
    }

    componentDidUpdate (prevProps) {
        if (prevProps.specs !== this.props.specs) {
            this.getSpecList()
        }
    }

    getSpecList () {
        this.setState({
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

    renderListView () {
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
                                    selectedView={this.props.selectedView}
                                />
                            );
                        } else {
                            return (
                                <ExpectationList
                                    key={item.id}
                                    spec={item}
                                    expectations={item.expectations}
                                    id={item.id}
                                    selectedView={this.props.selectedView}
                                />
                            );
                        }
                    })
                }
                </tbody>
            </table>
        )
    }

    render () {
        if (this.props.selectedView && this.props.selectedView === "list") {
            return this.renderListView()
        }

        return (
            <ListGroup>
                {
                    this.props.specs.map((item, index) => {
                        return (
                            <Spec
                                key={index}
                                spec={item}
                                selectedSpec={this.props.selectedSpec}
                                onSelectedSpec={this.props.onSelectedSpec}
                                onValidate={this.props.onValidate}
                            />
                        )
                    })
                }
            </ListGroup>
        )
    }
};

export default SpecListPane;
