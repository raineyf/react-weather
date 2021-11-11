import React from "react";

function WeatherSection(props) {
    return (
        <div className="section-container">
            <div className="date-container">
                <h3>
                    {props.maxTemp
                        ? props.time.slice(0, props.time.lastIndexOf(","))
                        : props.time}
                </h3>
            </div>
            <div className="weather-main-container">
                <div className="description">
                    <p>{props.description}</p>
                </div>
                <div className="weather-icon">
                    <img
                        alt={props.description + " weather icon"}
                        src={
                            "http://openweathermap.org/img/wn/" +
                            props.icon +
                            "@2x.png"
                        }
                    />
                </div>
                {!props.maxTemp && (
                    <div className="temperature">
                        <p>{props.temperature}°F</p>
                    </div>
                )}
            </div>
            <div className="weather-details-container">
                {props.maxTemp && (
                    <div className="max-temp">
                        <p>High: {props.maxTemp}°F</p>
                    </div>
                )}
                {props.minTemp && (
                    <div className="min-temp">
                        <p>Low: {props.minTemp}°F</p>
                    </div>
                )}
                <div className="humidity">
                    <p>Humidity: {props.humidity}%</p>
                </div>
                <div className="wind-speed">
                    <p>Wind: {props.windSpeed} MPH</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherSection;
