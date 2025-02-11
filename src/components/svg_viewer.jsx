import { useState } from "react";

function KitchenView() {
  const [wallColor, setWallColor] = useState("#f0f0f0");
  const [tableColor, setTableColor] = useState("#8b5e3c");

  return (
    <div>
      <svg width="500" height="300" viewBox="0 0 500 300">
        {/* Wall */}
        <rect x="0" y="0" width="500" height="150" fill={wallColor} />
        {/* Table */}
        <rect x="150" y="180" width="200" height="50" fill={tableColor} />
      </svg>

      {/* Color Buttons */}
      <button onClick={() => setWallColor("#ff5733")}>Red Wall</button>
      <button onClick={() => setWallColor("#3498db")}>Blue Wall</button>
      <button onClick={() => setTableColor("#654321")}>Dark Table</button>
      <button onClick={() => setTableColor("#d4af37")}>Gold Table</button>
    </div>
  );
}
export default KitchenView;