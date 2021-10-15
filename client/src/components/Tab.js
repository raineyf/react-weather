import React from "react";

function Tab(props) {
    return (
        <button
            role="tab"
            aria-selected={props.selected && "true"}
            tabIndex={props.selected ? "0" : "-1"}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}

export default Tab;
