import React from 'react';


const ExceptionPane = ({exception, id} ) => {
    return (
        <a className="exception" data-toggle="collapse" href={`#${id}`}>{exception}</a>
    );
};

export default ExceptionPane;
