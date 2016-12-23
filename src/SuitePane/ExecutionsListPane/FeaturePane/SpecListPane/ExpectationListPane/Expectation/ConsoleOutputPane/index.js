import React from 'react';
import uuid from 'uuid'

const ConsoleOutputPane = ({consoleOutput}) => {
        if (!consoleOutput){
            return(
                <div className="console-output">
                    <a disabled="disabled" href="#">Console output</a>
                </div>
            );
        } else {
            const id = uuid();
            return(
                <div className="console-output">
                    <a data-toggle="collapse" href={`#${id}`}>Console output</a>
                    <pre className="collapse" id={id}>{consoleOutput}</pre>
                </div>
            )
        }
};

export default ConsoleOutputPane;