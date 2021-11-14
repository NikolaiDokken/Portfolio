import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

export default function Navbar() {
    const size = useWindowSize();
    const [navOpen, setNavOpen] = useState(false);

    /* Set the width of the side navigation to 250px */
    const toggleNav = () => {
        document.getElementById("hamburger").classList.toggle("change");
        document.getElementById("sidenav").style.width = !navOpen
            ? "250px"
            : "0px";
        setNavOpen(!navOpen);
    };

    return (
        <nav>
            <h1>Niko's koder</h1>
            {size.width > 600 ? (
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/projects/">Projects</Link>
                    <Link to="/about/">About Me</Link>
                    <Link to="/admin/">For Me</Link>
                </div>
            ) : (
                <div className="links">
                    <button
                        id="hamburger"
                        className="hamburger"
                        onClick={toggleNav}
                    >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </button>
                    <div id="sidenav" className="sidenav">
                        <Link to="/">Hjem</Link>
                        <Link to="/projects/">Prosjekter</Link>
                        <Link to="/about/">Om meg</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}
