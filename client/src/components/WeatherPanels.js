import React, { useState, useRef } from "react";
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

    const tabs = useRef(null);

    const handleKeyDown = (e) => {
        const tabButtons = [];
        tabs.current.childNodes.forEach((tab) => {
            tabButtons.push(tab);
        });
        const targetIndex = tabButtons.indexOf(e.target);
        const buttonsLength = tabButtons.length;
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.id === "currentTab") {
                setSelectedTab("current");
            } else if (e.target.id === "hourlyTab") {
                setSelectedTab("hourly");
            } else if (e.target.id === "dailyTab") {
                setSelectedTab("daily");
            }
            e.target.focus();
        }
        if (e.key === "ArrowRight") {
            if (targetIndex === buttonsLength - 1) {
                tabButtons[0].focus();
            } else {
                tabButtons[targetIndex + 1].focus();
            }
        }
        if (e.key === "ArrowLeft") {
            if (targetIndex === 0) {
                tabButtons[buttonsLength - 1].focus();
            } else {
                tabButtons[targetIndex - 1].focus();
            }
        }
    };
    console.log(tabs.current);
    return (
        <>
            {props.location.length > 0 && <h2>Weather in {props.location}</h2>}
            {props.location.length === 0 && <h2>Your Weather</h2>}
            <div role="tablist" aria-label="weather" ref={tabs}>
                {props.weather.current && (
                    <Tab
                        label="Current"
                        selected={selectedTab === "current"}
                        onClick={handleCurrentClick}
                        onKeyDown={handleKeyDown}
                        ariaControls="currentPanel"
                        id="currentTab"
                    />
                )}
                {props.weather.hourly && (
                    <Tab
                        label="Hourly"
                        selected={selectedTab === "hourly"}
                        onClick={handleHourlyClick}
                        onKeyDown={handleKeyDown}
                        ariaControls="hourlyPanel"
                        id="hourlyTab"
                    />
                )}
                {props.weather.daily && (
                    <Tab
                        label="Daily"
                        selected={selectedTab === "daily"}
                        onClick={handleDailyClick}
                        onKeyDown={handleKeyDown}
                        ariaControls="dailyPanel"
                        id="dailyTab"
                    />
                )}
            </div>
            <div className="tabpanels">
                {props.weather.current && (
                    <TabPanel
                        id="currentPanel"
                        ariaLabelledBy="currentTab"
                        active={selectedTab === "current"}
                        label="Current Weather"
                    />
                )}
                {props.weather.hourly && (
                    <TabPanel
                        id="hourlyPanel"
                        ariaLabelledBy="hourlyTab"
                        active={selectedTab === "hourly"}
                        label="Hourly Weather"
                    />
                )}
                {props.weather.daily && (
                    <TabPanel
                        id="dailyPanel"
                        ariaLabelledBy="dailyTab"
                        active={selectedTab === "daily"}
                        label="Daily Weather"
                    />
                )}
            </div>
        </>
    );
}

export default WeatherPanels;
