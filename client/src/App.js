import React, { useState, useEffect } from "react";
import Locator from "./components/Locator";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return (
        <div>
            <header>
                <h1>Weather</h1>
            </header>
            <main>
                <Locator />
            </main>
        </div>
    );
}

export default App;
