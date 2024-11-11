import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

function App() {
    const [isParticlesInit, setIsParticlesInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); // Load a slim version of the particles
        }).then(() => {
            setIsParticlesInit(true);
        });
    }, []);

    const particlesOptions = useMemo(() => createParticlesOptions(), []);

    return (
        <div className="App">
            {isParticlesInit && <Particles id="tsparticles" options={particlesOptions} />}
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
            {/* <FaceRecognition /> */}
        </div>
    );
}

function createParticlesOptions() {
    return {
        background: { color: { value: "#09c4e7" } },
        fpsLimit: 144,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
            },
            modes: {
                push: { quantity: 70 },
                repulse: { distance: 200, duration: 0.4 },
            },
        },
        particles: {
            color: { value: "#ffffff" },
            links: {
                color: "#ffffff",
                distance: 130,
                enable: true,
                opacity: 2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                speed: 7,
            },
            number: { density: { enable: true }, value: 70 },
            opacity: { value: 0.7 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 7 } },
        },
        detectRetina: true,
    };
}

export default App;
