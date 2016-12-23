import React from 'react';


const SpecPane = ({spec} ) => {
    var icon_class;
    var class_name;
    switch (spec.status) {
        case "failed":
            icon_class = "glyphicon-remove";
            class_name = "warning";
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
            class_name = "danger";
    }
    return(
        <tr>
            <td className={`status-${class_name} text-center`}>
                <i className={`glyphicon ${icon_class}`} ></i>
            </td>
            <td><a href={`#${spec.id}`} data-toggle="collapse">{spec.name}</a></td>
            <td>{spec.description}</td>
            <td>{spec.run_time}</td>
        </tr>
    );
};

export default SpecPane;
