import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Home.css';

function Home() {
    const location = useLocation();

    return (
        <div style={{ backgroundColor: "#87ceeb", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>

            {location.pathname === "/" && (
                <div className="home-container">
                    <h1>To-Do List</h1>
                    <div className="home-buttons">
                        <Link to="/login">
                            <button className="btn">Click here for Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn">Click here for Signup</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
