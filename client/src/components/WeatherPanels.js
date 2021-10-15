import React, { useState } from "react";
import Tab from "./Tab";
import TabPanel from "./TabPanel";

function WeatherPanels(props) {
    const [selectedTab, setSelectedTab] = useState("current");
    const handleCurrentClick = () => {
        setSelectedTab("current");
    };
    const handleHourlyClick = () => {
        setSelectedTab("hourly");
    };
    const handleDailyClick = () => {
        setSelectedTab("daily");
    };
    console.log(props.weather);
    return (
        <>
            {props.location.length > 0 && <h2>Weather in {props.location}</h2>}
            {props.location.length === 0 && <h2>Your Weather</h2>}
            <div role="tablist" aria-label="weather">
                {props.weather.current && (
                    <Tab
                        label="Current"
                        selected={selectedTab === "current"}
                        onClick={handleCurrentClick}
                    />
                )}
                {props.weather.hourly && (
                    <Tab
                        label="Hourly"
                        selected={selectedTab === "hourly"}
                        onClick={handleHourlyClick}
                    />
                )}
                {props.weather.daily && (
                    <Tab
                        label="Daily"
                        selected={selectedTab === "daily"}
                        onClick={handleDailyClick}
                    />
                )}
            </div>
        </>
    );
}

export default WeatherPanels;
