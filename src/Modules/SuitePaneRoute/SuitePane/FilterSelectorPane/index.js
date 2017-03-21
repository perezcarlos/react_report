import React, { Component } from 'react';
import groupBy from 'lodash.groupby';


class FilterSelectorPane extends Component {
    constructor(props){
        super(props);

        this.state = {
            filters: ['status', 'feature'],
            selectedFilter: this.props.filter
        };

        this.onSelectFilter=this.onSelectFilter.bind(this);
        this.renderFilter=this.renderFilter.bind(this);
        this.renderSubFilter=this.renderSubFilter.bind(this);
        this.getSubFilters=this.getSubFilters.bind(this);
        this.getFilterButtonClass=this.getFilterButtonClass.bind(this);
    }

    getSubFilters(filter) {
        const byFeature = groupBy(this.props.specs, (x) => x[filter]);
        if(!byFeature){
            return null
        } else {
            return Object.keys(byFeature)
        }
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
        const fullFilter = event.target.value;
        this.setState(
            {
                selectedFilter:
                    {
                        filter: fullFilter.split("-")[0],
                        subFilter: fullFilter.split("-")[1]
                    }
            }, () => {
                this.props.onChange(this.state.selectedFilter)
            }
        )
    }

    getFilterButtonClass (filter){
        if(this.state.selectedFilter.filter === filter){
            return "btn btn-default selected"
        } else {
            return "btn btn-default"
        }
    }

    renderFilter(filter, key) {
        return(
            <div key={key} className="btn-group">
                <button
                    key={key}
                    value={`${filter}-all`}
                    type="button"
                    className={this.getFilterButtonClass(filter)}
                    onClick={this.onSelectFilter}
                >
                    {filter}
                </button>
                {this.renderSubFilter(filter)}
            </div>
        )
    }

    renderSubFilter(filter){
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-default dropdown-toggle"
                    data-toggle="dropdown"
                >
                    <span className="caret"></span>
                    <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu sub-filter-selector">
                    {
                        this.getSubFilters(filter).map((subfilter) => {
                            const subFilterClass = this.state.selectedFilter.subFilter === subfilter ?
                                `${subfilter} selected` : {subfilter};
                            return(
                                <li key={subfilter}>
                                    <button
                                        key={subfilter}
                                        value={`${filter}-${subfilter}`}
                                        className={subFilterClass}
                                        onClick={this.onSelectFilter}
                                    >
                                        {subfilter}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
};

export default FilterSelectorPane;
