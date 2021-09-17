import React, { useState, useEffect } from "react";
import WeatherApp from "./components/WeatherApp";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return <WeatherApp />;
}

export default App;
