import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
    const [zoomIndex, setZoomIndex] = useState(0);
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const videoRefs = useRef([]);

    const videos = [
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
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
            setIsZoomedIn(true);

            // Play video when zooming in
            if (videoRefs.current[zoomIndex]) {
                videoRefs.current[zoomIndex].play();
            }

            setTimeout(() => {
                setIsZoomedIn(false);
                // Pause video when zooming out
                if (videoRefs.current[zoomIndex]) {
                    videoRefs.current[zoomIndex].pause();
                }
            }, 5000);

            setTimeout(() => {
                setZoomIndex((prevIndex) => (prevIndex + 1) % videos.length);
            }, 8000);
        };

        handleZoomEffect();

        const interval = setInterval(() => {
            handleZoomEffect();
        }, 8000);

        return () => clearInterval(interval);
    }, [videos.length, zoomIndex]);

    return (
        <div className="video-container">
            <div className={`background-overlay ${isZoomedIn ? 'active' : ''}`} />

            {videos.map((videoSrc, index) => (
                <div className="videoCovercontainer" key={index}>
                    <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className={`video-element ${zoomIndex === index ? (isZoomedIn ? 'zoom' : 'zoom-out') : ''}`}
                        controls muted
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            ))}
        </div>
    );
};

export default Home;
