import { useEffect } from "react";

const PanoramaViewer = ({ image }) => {
  const addCustomHotspot = (hotSpotDiv, args) => {
    const img = document.createElement("img");
    img.src = "https://cdn-icons-png.flaticon.com/512/25/25694.png"; // Replace with your image URL
    img.style.width = "50px"; // Adjust size
    img.style.height = "50px";
    img.style.cursor = "pointer";
    img.style.borderRadius = "50%"; // Optional: Make it circular
    img.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.3)"; // Optional: Add shadow

    // Click event for the image
    img.onclick = () => {
      alert("Hotspot Image Clicked!");
    };

    hotSpotDiv.appendChild(img);
  };

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
        {
          pitch: 1,
          yaw: 3,
          text: "Click here for more info",
          createTooltipFunc: addCustomHotspot,
          clickHandlerFunc: (event) => {
            alert("You clicked on Hotspot 1!");
          },
        },
      ],
    });
  }, []);

  return (
    <div
      id="panorama"
      style={{ width: "70vw", height: "500px", border: "1px solid #ccc" }}
    ></div>
  );
};

export default PanoramaViewer;
