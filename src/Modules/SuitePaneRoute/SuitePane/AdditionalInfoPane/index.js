import React from 'react';
import uuid from 'uuid';

const AdditionalInfoPane = ({additionalInfo}) => {
    const id = `additional-${uuid()}`;
    if (!additionalInfo) {
        return null;
    }

    // Format date to a legible format
    const info = Object.assign({}, additionalInfo, {date: (new Date(additionalInfo.date))});

    return(
        <div className="additional-build-info">
            <a href={`#${id}`} data-toggle="collapse">Show more info</a>
            <pre className="additional-info collapse" id={id}>
                {
                    Object.keys(info).map((key) => {
                        return(
                            <div key={key} id={key}>
                                <p>
                                    <b>{key}</b>
                                    {`: ${info[key]}`}
                                </p>
                            </div>
                        );
                    })
                }
            </pre>
        </div>
    )
};

AdditionalInfoPane.defaultProps = {
    additionInfo: {}
};

export default AdditionalInfoPane;

