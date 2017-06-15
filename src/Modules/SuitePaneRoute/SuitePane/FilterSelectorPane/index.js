import React, { Component } from 'react';
import { groupBy } from 'lodash';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';


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
            <b>Filter by: </b>
            <div className="filter-selector buttons">
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
        const fullFilter = event.currentTarget.attributes.value.value;
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
            return "active"
        } else {
            return ""
        }
    }

    renderFilter(filter, key) {
        return(
            <ButtonGroup key={key} className="btn-group">
                <Button
                    key={key}
                    value={`${filter}-all`}
                    bsStyle="default"
                    className={this.getFilterButtonClass(filter)}
                    onClick={this.onSelectFilter}
                >
                    {filter}
                </Button>
                {this.renderSubFilter(filter)}
            </ButtonGroup>
        )
    }

    renderSubFilter(filter){
        return (
            <div>
                <DropdownButton
                    id="bg-nested-dropdown"
                    title=""
                >
                    {
                        this.getSubFilters(filter).sort().map((subfilter) => {
                            const subFilterClass = this.state.selectedFilter.subFilter === subfilter ?
                                `${subfilter} active` : {subfilter};
                            return(
                                <MenuItem
                                    key={subfilter}
                                    value={`${filter}-${subfilter}`}
                                    className={subFilterClass}
                                    onClick={this.onSelectFilter}
                                >
                                    {subfilter}
                                </MenuItem>
                            )
                        })
                    }
                </DropdownButton>
            </div>
        )
    }
};

export default FilterSelectorPane;
