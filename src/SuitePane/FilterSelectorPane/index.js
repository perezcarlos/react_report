import React from 'react';


const FilterSelectorPane = ({onChange}) => {


    return(
        <div className="btn-group" role="group">
            <button type="button" class="btn btn-default" onClick={() => onChange('feature')}>Feature</button>
            <button type="button" class="btn btn-default" onClick={() => onChange('status')}>Status</button>
        </div>
    )
};

export default FilterSelectorPane;
