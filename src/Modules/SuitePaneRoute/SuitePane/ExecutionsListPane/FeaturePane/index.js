import React from 'react';
import SpecList from './SpecListPane';


const FeaturePane = ({specs, id} ) => {
    return(
        <div>
            <div key={id}>
                <div className="feature-name">
                    <h2>{id}</h2>
                    <label>Specs {Object.values(specs).length}</label>
                </div>
                <SpecList key={id} specs={specs} />
            </div>
        </div>
    )
};

export default FeaturePane;
