import React, { useState, useEffect } from "react";

function Locator() {
    const geolocationAvailable = "geolocation" in navigator;
    return (
        <div>
            <h2>Where do you need weather data for?</h2>
            <p>
                {geolocationAvailable
                    ? "geolocation available!"
                    : "no geolocation available"}
            </p>
            <fieldset>
                <legend>How should we get your weather data?</legend>
                {geolocationAvailable && (
                    <div>
                        <div className="radio-container">
                            <input
                                type="radio"
                                name="location"
                                id="geolocation"
                                value="geolocation"
                                defaultChecked
                            />
                            <label htmlFor="geolocation">
                                Use My Current Location
                            </label>
                        </div>
                        <div className="radio-container">
                            <input
                                type="radio"
                                name="location"
                                id="zip"
                                value="zip"
                            />
                            <label htmlFor="zip">Input ZIP</label>
                        </div>
                        <div className="radio-container">
                            <input
                                type="radio"
                                name="location"
                                id="city"
                                value="city"
                            />
                            <label htmlFor="city">Input City</label>
                        </div>
                    </div>
                )}
                {!geolocationAvailable && (
                    <div>
                        <div className="radio-container">
                            <input
                                type="radio"
                                name="location"
                                id="zip"
                                value="zip"
                                defaultChecked
                            />
                            <label htmlFor="zip">Input ZIP</label>
                        </div>
                        <div className="radio-container">
                            <input
                                type="radio"
                                name="location"
                                id="city"
                                value="city"
                            />
                            <label htmlFor="city">Input City</label>
                        </div>
                    </div>
                )}
            </fieldset>
        </div>
    );
}

export default Locator;
