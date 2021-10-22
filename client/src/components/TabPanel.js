import React from "react";

function TabPanel(props) {
    return (
        <div
            role="tabpanel"
            aria-labelledby={props.ariaLabelledBy}
            id={props.id}
            tabIndex={props.active ? "0" : "-1"}
            className={props.active ? "" : "hidden"}
        >
            {props.label}
        </div>
    );
}

export default TabPanel;
