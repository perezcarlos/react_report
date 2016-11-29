import React from 'react';
import SpecList from './SpecListPane';


const FeaturePane = ({specs, id} ) => {
    return(
        <div>
            <div key={id}>
                <h2>{id}</h2>
                <SpecList key={id} specs={specs} />
            </div>
        </div>
    )
}

export default FeaturePane;
