import React from 'react';


const FilterSelectorPane = ({onChange}) => {
    return(
        <div className="filter-selector-pane">
            <label>Filter by: </label>
            <div className="btn-group filter-selector buttons" role="group">
                <button type="button" className="btn btn-default" onClick={() => onChange('feature')}>Feature</button>
                <button type="button" className="btn btn-default" onClick={() => onChange('status')}>Status</button>
            </div>
        </div>
    )
};

export default FilterSelectorPane;
