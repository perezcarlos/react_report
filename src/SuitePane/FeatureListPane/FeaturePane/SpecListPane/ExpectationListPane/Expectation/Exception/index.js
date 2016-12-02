import React from 'react';


const ExceptionPane = ({exception, id} ) => {
    return (
        <a data-toggle="collapse" href={`#${id}`}>{exception}</a>
    );
}

export default ExceptionPane;
