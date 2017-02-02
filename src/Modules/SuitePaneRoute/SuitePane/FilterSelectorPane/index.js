import React, { Component } from 'react';


class FilterSelectorPane extends Component {
    constructor(props){
        super(props);

        this.state = {
            filters: ['feature', 'status'],
            selectedFilter: this.props.filter
        };

        this.onSelectFilter=this.onSelectFilter.bind(this);
        this.renderFilter=this.renderFilter.bind(this);
    }

    render() {
        return (
        <div className="filter-selector-pane">
            <label>Filter by: </label>
            <div className="btn-group filter-selector buttons" role="group">
                {
                    this.state.filters.map((filter, index) => {
                        return(
                            this.renderFilter(filter, index)
                        )
                    })
                }
            </div>
        </div>
        )
    }

    onSelectFilter (event){
        this.setState({selectedFilter: event.target.value}, () => {
            this.props.onChange(this.state.selectedFilter)
        })
    }

    renderFilter(filter, key) {
        if(this.state.selectedFilter === filter){
            return(
                <button key={key} value={filter} type="button" className="btn btn-default selected" onClick={this.onSelectFilter}>{filter}</button>
            )
        }
        return(
            <button key={key} value={filter} type="button" className="btn btn-default" onClick={this.onSelectFilter}>{filter}</button>
        )
    }

};

export default FilterSelectorPane;
