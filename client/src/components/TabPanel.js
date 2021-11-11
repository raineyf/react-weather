import React from "react";
import WeatherSection from "./WeatherSection.js";

function TabPanel(props) {
    const convertTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];
        const readableDate =
            days[date.getDay()] +
            ", " +
            months[date.getMonth()] +
            " " +
            date.getDate();
        const hours = date.getHours() % 12 || 12;
        const amPm = date.getHours() >= 12 ? "pm" : "am";
        const minutes = "0" + date.getMinutes();
        const formattedTime =
            readableDate + ", " + hours + ":" + minutes.substr(-2) + amPm;
        return formattedTime;
    };
    return (
        <div
            role="tabpanel"
            aria-labelledby={props.ariaLabelledBy}
            id={props.id}
            tabIndex={props.active ? "0" : "-1"}
            className={props.active ? "tabpanel" : "tabpanel hidden"}
        >
            {props.id === "currentPanel" && (
                <WeatherSection
                    time={convertTime(props.weatherData.dt)}
                    description={props.weatherData.weather[0].main}
                    temperature={
                        props.weatherData.temp.toString().split(".")[0]
                    }
                    humidity={props.weatherData.humidity.toString()}
                    windSpeed={props.weatherData.wind_speed.toString()}
                    icon={props.weatherData.weather[0].icon}
                />
            )}
            {props.id === "hourlyPanel" &&
                props.weatherData.map((hour, i) => {
                    return (
                        <WeatherSection
                            time={convertTime(hour.dt)}
                            key={i}
                            description={hour.weather[0].main}
                            temperature={hour.temp.toString().split(".")[0]}
                            humidity={hour.humidity.toString()}
                            windSpeed={hour.wind_speed.toString()}
                            icon={hour.weather[0].icon}
                        />
                    );
                })}
            {props.id === "dailyPanel" &&
                props.weatherData.map((day, i) => {
                    return (
                        <WeatherSection
                            time={convertTime(day.dt)}
                            key={i}
                            description={day.weather[0].main}
                            temperature={day.temp.day.toString().split(".")[0]}
                            humidity={day.humidity.toString()}
                            windSpeed={day.wind_speed.toString()}
                            maxTemp={day.temp.max.toString().split(".")[0]}
                            minTemp={day.temp.min.toString().split(".")[0]}
                            icon={day.weather[0].icon}
                        />
                    );
                })}
        </div>
    );
}

export default TabPanel;
