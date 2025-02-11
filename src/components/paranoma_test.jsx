import { useEffect } from "react";

const PanoramaViewer = ({ image }) => {
  useEffect(() => {
    // Initialize Pannellum after component mounts
    window.pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: "https://pannellum.org/images/alma.jpg", // Change this to your 360 image URL
      autoLoad: true,
      compass: true,
      hotSpots: [
        {
          pitch: 10,
          yaw: 50,
          type: "info",
          text: "Click here for more info",
        },
      ],
    });
  }, []);

  return (
    <div
      id="panorama"
      style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default PanoramaViewer;
