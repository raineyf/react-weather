import React from "react";
import WeatherSection from "./WeatherSection.js";

function TabPanel(props) {
    console.log(props.weatherData);
    const convertTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        const hours = date.getHours() % 12 || 12;
        const amPm = date.getHours() >= 12 ? "pm" : "am";
        const minutes = "0" + date.getMinutes();
        const formattedTime = hours + ":" + minutes.substr(-2) + amPm;
        return formattedTime;
    };
    return (
        <div
            role="tabpanel"
            aria-labelledby={props.ariaLabelledBy}
            id={props.id}
            tabIndex={props.active ? "0" : "-1"}
            className={props.active ? "" : "hidden"}
        >
            {props.label}
            {props.id === "currentPanel" && (
                <h2>{convertTime(props.weatherData.dt)}</h2>
            )}
            {props.id === "hourlyPanel" &&
                props.weatherData.map((hour, i) => {
                    return (
                        <WeatherSection time={convertTime(hour.dt)} key={i} />
                    );
                })}
            {props.id === "dailyPanel" &&
                props.weatherData.map((day, i) => {
                    return (
                        <WeatherSection time={convertTime(day.dt)} key={i} />
                    );
                })}
        </div>
    );
}

export default TabPanel;
