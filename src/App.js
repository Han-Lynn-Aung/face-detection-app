import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

// Custom hook to check for reduced motion preference
const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
};

function App() {
    const [isParticlesInit, setIsParticlesInit] = useState(false);
    const reducedMotion = useReducedMotion();

    // Initialize particles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setIsParticlesInit(true);
        });
    }, []);

    // Configure particles options with reduced motion consideration
    const particlesOptions = useMemo(() => ({
        background: { color: { value: "#09c4e7" } },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
            },
            modes: {
                push: { quantity: reducedMotion ? 10 : 40 },
                repulse: { distance: 100, duration: 0.2 },
            },
        },
        particles: {
            color: { value: "#ffffff" },
            links: {
                color: "#ffffff",
                distance: 130,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                speed: reducedMotion ? 2 : 4,
            },
            number: { density: { enable: true }, value: reducedMotion ? 20 : 40 },
            opacity: { value: reducedMotion ? 0.2 : 0.7 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
    }), [reducedMotion]);

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

export default App;
