import React, { useEffect, useState } from 'react';
import ideaUx from '../video/ideaUx.mp4';
// import ideaUx from '../video/nature.mp4';

const Home = () => {
    const [zoomIndex, setZoomIndex] = useState(0); 
    const [isZoomedIn, setIsZoomedIn] = useState(false); 
    const [clickedIndex, setClickedIndex] = useState(null);

    const videos = [
        ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx,
        ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx, ideaUx,
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
                                ? isZoomedIn
                                    ? 'zoom'
                                    : 'zoom-out'
                                : ''
                            }`}
                        autoPlay
                        muted
                        loop
                        playsInline
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
