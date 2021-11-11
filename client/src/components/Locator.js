import React, { useState } from "react";
import WeatherPanels from "./WeatherPanels";

function Locator() {
    const geolocationAvailable = "geolocation" in navigator;
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [latLon, setLatLon] = useState("");
    const [weather, setWeather] = useState({});
    const [error, setError] = useState("");
    const handleLocationChange = async (e) => {
        setLocation(e.target.value);
        if (e.target.value.length >= 1) {
            const url =
                "/locations/" +
                new URLSearchParams({ string: e.target.value }).get("string");
            const res = await fetch(url);
            const data = await res.json();
            !locations.includes(e.target.value) &&
                data.features &&
                setLocations(data.features.map((result) => result.place_name));
            const lat = data.features[0].geometry.coordinates[1];
            const lon = data.features[0].geometry.coordinates[0];
            setLatLon(lat + "," + lon);
        }
    };
    const useCurrentLocation = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latlon =
                position.coords.latitude + "," + position.coords.longitude;
            setLatLon(latlon);
            const url =
                "/weather/" +
                new URLSearchParams({ latlon: latlon }).get("latlon");
            const res = await fetch(url);
            const data = await res.json();
            setWeather(data);
        });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (location === "") {
            setError("Please select a valid location");
            return;
        }
        setError("");
        const url =
            "/weather/" + new URLSearchParams({ latlon: latLon }).get("latlon");
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
    };
    const handleNewLocation = (e) => {
        e.preventDefault();
        setWeather({});
    };
    return (
        <>
            {Object.keys(weather).length === 0 && (
                <form onSubmit={handleFormSubmit} aria-labelledby="form-legend">
                    <fieldset>
                        <legend id="form-legend">
                            Please provide a location
                        </legend>
                        {geolocationAvailable && (
                            <div className="form-row">
                                <button onClick={useCurrentLocation}>
                                    Use my Current Location
                                </button>
                            </div>
                        )}
                        <div className="form-row">
                            <p>- or -</p>
                        </div>
                        <div className="form-row">
                            <label htmlFor="location">
                                Search for a Location:
                            </label>
                            <input
                                type="text"
                                list="locations"
                                name="location"
                                id="location"
                                value={location}
                                placeholder="For example, New York City"
                                onChange={handleLocationChange}
                                pattern={locations.join("|")}
                                autoComplete="off"
                                aria-describedby="locations-error"
                            />

                            <datalist id="locations">
                                {locations.map((place, i) => (
                                    <option key={i} value={place} />
                                ))}
                            </datalist>
                        </div>
                        {error !== "" && (
                            <p
                                className="locations-error"
                                id="locations-error"
                                aria-live="polite"
                            >
                                {error}
                            </p>
                        )}
                        <div className="form-row">
                            <button type="submit">Submit Location</button>
                        </div>
                    </fieldset>
                </form>
            )}
            {Object.keys(weather).length > 0 && (
                <WeatherPanels location={location} weather={weather} />
            )}
            {Object.keys(weather).length > 0 && (
                <button className="change-button" onClick={handleNewLocation}>
                    Change Location
                </button>
            )}
        </>
    );
}

export default Locator;
