import React, { useState, useEffect } from "react";

function Locator() {
    const geolocationAvailable = "geolocation" in navigator;
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        if (!location) {
            console.log("No Location");
        }
    };
    useEffect(() => {
        const url = "/locations/" + new URLSearchParams({ string: location });
        fetch(url)
            .then((res) => res.json())
            .then((data) => setLocations(data));
    }, [location]);
    return (
        <form aria-labelledby="form-legend">
            <fieldset>
                <legend id="form-legend">
                    How should we get your weather?
                </legend>
                {geolocationAvailable && (
                    <div className="form-row">
                        <button>Use my Current Location</button>
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
                    />
                    <datalist id="locations">
                        <option>Chicago</option>
                        <option>Cleveland</option>
                        <option>Columbus</option>
                        <option>Cincinnati</option>
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
