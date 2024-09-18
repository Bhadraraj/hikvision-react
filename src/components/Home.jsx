import React, { useEffect, useState } from 'react';
import goat from '../video/goat.mp4'

const Home = () => {
    const [zoomIndex, setZoomIndex] = useState(0); // Track which video is zooming
    const [isZoomedIn, setIsZoomedIn] = useState(false); // Track if a video is zoomed in
    const [clickedIndex, setClickedIndex] = useState(null); // Track which video is clicked


    const videos = [
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,
        goat,

    ];


    useEffect(() => {
        if (clickedIndex === null) {
            const zoomDuration = 5000;
            const delayBetweenZooms = 3000;
            const totalInterval = zoomDuration + delayBetweenZooms;

            const handleZoomEffect = () => {
                setIsZoomedIn(true);

                setTimeout(() => {
                    setIsZoomedIn(false);
                }, zoomDuration);
            };

            handleZoomEffect();

            const interval = setInterval(() => {
                setZoomIndex((prevIndex) => (prevIndex + 1) % videos.length);
                handleZoomEffect();
            }, totalInterval);
            return () => clearInterval(interval);
        }
    }, [clickedIndex, videos.length]);

    const handleVideoClick = (index) => {
        if (clickedIndex === index) {

            setIsZoomedIn(false);
            setClickedIndex(null);
        } else {

            setClickedIndex(index);
            setIsZoomedIn(true);

            setTimeout(() => {
                setIsZoomedIn(false);
                setClickedIndex(null);
            }, 5000);
        }
    };

    return (
        <div className="video-container">
            <div className={`background-overlay ${isZoomedIn ? 'active' : ''}`} />

            {videos.map((videoSrc, index) => (
                <div
                    className="videoCovercontainer"
                    key={index}
                    onClick={() => handleVideoClick(index)}
                >
                    <video
                        className={`video-element ${(clickedIndex === index || (clickedIndex === null && zoomIndex === index))
                            ? isZoomedIn ? 'zoom' : 'zoom-out'
                            : ''
                            }`}
                        autoPlay
                        muted
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ))}
        </div>
    );
};


export default Home;