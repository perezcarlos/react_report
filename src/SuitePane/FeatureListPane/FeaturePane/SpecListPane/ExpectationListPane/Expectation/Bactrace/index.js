import React from 'react';


const BacktracePane = ({backtrace, id} ) => {
    return (
        <pre className="collapse" id={id} >
            {
                backtrace.map((backtrc, index) => {
                    return(
                        <p key={index}>{backtrc}</p>
                    )
                })
            }
        </pre>
    );
}

export default BacktracePane;
