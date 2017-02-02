import React from 'react';
import uuid from 'uuid'


const AdditionalSpecInfoPane = ({additionalInfo} ) => {
    const id = uuid();
    if(!additionalInfo){
        return(
            <div className="spec-additional-info">
                <a disabled="disabled" href="#">More info</a>
            </div>
        )
    }
    return(
        <div className="spec-additional-info">
            <a data-toggle="collapse" href={`#${id}`}>More info</a>
            <pre id={id} className="collapse">
            {
                Object.keys(additionalInfo).map((key) => {
                    return(
                        <p key={key}>
                            <b>{key}</b>
                            {`: ${JSON.stringify(additionalInfo[key])}`}
                        </p>
                    );
                })
            }
            </pre>
        </div>
    );
};

export default AdditionalSpecInfoPane;
