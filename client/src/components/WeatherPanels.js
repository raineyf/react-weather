import React from "react";

function WeatherPanels(props) {
    return (
        <>
            {props.location.length > 0 && <h2>Weather in {props.location}</h2>}
            {props.location.length === 0 && <h2>Your Weather</h2>}
        </>
    );
}

export default WeatherPanels;
