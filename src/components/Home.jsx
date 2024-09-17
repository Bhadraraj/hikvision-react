import React, { useEffect, useState } from 'react';

const Home = () => {
    const [zoomIndex, setZoomIndex] = useState(0); // Track which video is zooming
    const [isZoomedIn, setIsZoomedIn] = useState(false); // Track if a video is zoomed in

    // Videos to be rendered
    const videos = [
        'https://www.w3schools.com/html/mov_bbb.mp4',

        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
    ];

    useEffect(() => {
        const handleZoomEffect = () => {
            setIsZoomedIn(true); // Start zooming in

            setTimeout(() => {
                setIsZoomedIn(false); // Start zooming out
            }, 5000); // Hold zoom for 5 seconds

            setTimeout(() => {
                setZoomIndex((prevIndex) => (prevIndex + 1) % videos.length);
            }, 8000); // 3s zoom-in + 5s hold time = 8s
        };

        handleZoomEffect(); // Start the zoom effect

        const interval = setInterval(() => {
            handleZoomEffect();
        }, 8000); // Repeat every 8 seconds

        return () => clearInterval(interval); // Cleanup
    }, [videos.length]);

    return (
        <div className="video-container">
            <div className={`background-overlay ${isZoomedIn ? 'active' : ''}`} />

            {videos.map((videoSrc, index) => (
                <div className="videoCovercontainer" key={index}>
                    <video
                        className={`video-element ${zoomIndex === index ? (isZoomedIn ? 'zoom' : 'zoom-out') : ''}`}
                        controls autoPlay muted
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
