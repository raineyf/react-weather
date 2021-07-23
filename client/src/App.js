import React, { useState, useEffect } from "react";

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
                <h1>Your Node & React App</h1>
            </header>
            <main>
                <p>{!data ? "Loading..." : data}</p>
            </main>
        </div>
    );
}

export default App;
