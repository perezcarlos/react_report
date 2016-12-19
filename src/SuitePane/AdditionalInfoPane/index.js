import React from 'react';


const AdditionalInfoPane = ({additionalInfo, id}) => {
    if (!additionalInfo) {
        return null;
    }
    return(
        <pre className="additional-info collapse" id={id}>
            {
                Object.keys(additionalInfo).map((key) => {
                    return(
                        <div key={key} id={key}>
                            <p>
                                <b>{key}</b>
                                {`: ${additionalInfo[key]}`}
                            </p>
                        </div>
                    );
                })
            }
        </pre>
    )
};

AdditionalInfoPane.defaultProps = {
    additionInfo: {}
};

export default AdditionalInfoPane;

