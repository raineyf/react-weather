import React, { useState, useEffect } from "react";
import WeatherPanels from "./WeatherPanels";

function Locator() {
    const [locationAvailable, setLocationAvailable] = useState(false);
    const [latLon, setLatLon] = useState("");
    const [currentLatLon, setCurrentLatLon] = useState("");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [error, setError] = useState("");

    const geolocationAvailable = () => {
        if ("geolocation" in navigator) {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position.coords.latitude) {
                            setLocationAvailable(true);
                            const latlon =
                                position.coords.latitude +
                                "," +
                                position.coords.longitude;
                            setCurrentLatLon(latlon);
                        } else {
                            setLocationAvailable(false);
                        }
                    },
                    (err) => {
                        return setLocationAvailable(false);
                    }
                );
            } catch (err) {
                return setLocationAvailable(false);
            }
        } else {
            return setLocationAvailable(false);
        }
    };

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

    const useCurrentLocation = async (e) => {
        e.preventDefault();
        const url =
            "/weather/" +
            new URLSearchParams({ latlon: currentLatLon }).get("latlon");
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!locations.includes(location)) {
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
        setLocation("");
        setLocations([]);
        setError("");
    };

    useEffect(() => {
        geolocationAvailable();
    }, []);

    return (
        <>
            {Object.keys(weather).length === 0 && (
                <form onSubmit={handleFormSubmit} aria-labelledby="form-legend">
                    <fieldset>
                        <legend id="form-legend">
                            Please provide a location
                        </legend>
                        {locationAvailable && (
                            <>
                                <div className="form-row">
                                    <button onClick={useCurrentLocation}>
                                        Use my Current Location
                                    </button>
                                </div>
                                <div className="form-row">
                                    <p>- or -</p>
                                </div>
                            </>
                        )}
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
                        <p
                            className="locations-error"
                            id="locations-error"
                            aria-live="polite"
                        >
                            {error !== "" && error}
                        </p>
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
