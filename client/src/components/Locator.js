import React, { useState } from "react";

function Locator() {
    const geolocationAvailable = "geolocation" in navigator;
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
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
        }
    };
    const useCurrentLocation = (e) => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latlon =
                position.coords.latitude + "," + position.coords.longitude;
            const url =
                "/weather/" +
                new URLSearchParams({ latlon: latlon }).get("latlon");
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
        });
    };
    const formSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={formSubmit} aria-labelledby="form-legend">
            <fieldset>
                <legend id="form-legend">
                    How should we get your weather?
                </legend>
                {geolocationAvailable && (
                    <div className="form-row">
                        <button onClick={useCurrentLocation}>
                            Use my Current Location
                        </button>
                    </div>
                )}
                <div className="form-row">
                    <label htmlFor="location">Search for a Location:</label>
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
                    />
                    <datalist id="locations">
                        {locations.map((place, i) => (
                            <option key={i} value={place} />
                        ))}
                    </datalist>
                </div>
                <div className="form-row">
                    <button type="submit">Submit Location</button>
                </div>
            </fieldset>
        </form>
    );
}

export default Locator;
