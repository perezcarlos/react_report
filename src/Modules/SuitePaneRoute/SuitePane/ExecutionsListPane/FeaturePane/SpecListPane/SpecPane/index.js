import React from 'react';
import AdditionalSpecInfo from './AdditionalSpecInfoPane';
import Validated from './ValidatedPane'


const SpecPane = ({spec, onValidate}) => {
    var icon_class;
    var class_name;
    switch (spec.status) {
        case "failed":
            icon_class = "glyphicon-remove";
            class_name = "failed";
            break;
        case "passed":
            icon_class = "glyphicon-ok";
            class_name = "success";
            break;
        case "pending":
            icon_class = "glyphicon-time";
            class_name = "pending";
            break;
        default:
            icon_class = "glyphicon-alert";
            class_name = "warning";
    }
    return(
        <tr>
            <td className="validated">
                <Validated spec={spec} onValidate={onValidate} />
            </td>
            <td className={`status status-${class_name} text-center`}>
                <i className={`glyphicon ${icon_class}`} ></i>
            </td>
            <td><a href={`#${spec.id}`} data-toggle="collapse">{spec.name}</a></td>
            <td>
                <div>
                    {spec.description}
                    <AdditionalSpecInfo additionalInfo={spec.additional_spec_info}/>
                </div>
            </td>
            <td>{spec.run_time}</td>
        </tr>
    );
};

export default SpecPane;
