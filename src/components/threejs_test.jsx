// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const ThreeSixtyViewer = ({ imageUrl }) => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create sphere geometry
//     const geometry = new THREE.SphereGeometry(500, 60, 40);
//     geometry.scale(-1, 1, 1); // Invert the sphere to view from inside

//     const texture = new THREE.TextureLoader().load(imageUrl);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     camera.position.set(0, 0, 0.1);

//     const controls = new THREE.OrbitControls(camera, renderer.domElement);
//     controls.enableZoom = false;
//     controls.enablePan = false;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [imageUrl]);

//   return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
// };

// export default ThreeSixtyViewer;

// import React from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import * as THREE from "three";

// const PanoramaViewer = ({ imageUrl }) => {
//   const texture = useLoader(THREE.TextureLoader, imageUrl);

//   return (
//     <Canvas camera={{ position: [0, 0, 0.1] }}>
//       {/* OrbitControls allows user to look around */}
//       <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

//       {/* Render a large sphere with the texture inside */}
//       <mesh>
//         <sphereGeometry args={[10, 60, 40]} /> {/* Larger sphere for better perspective */}
//         <meshBasicMaterial map={texture} side={THREE.BackSide} />
//       </mesh>
//     </Canvas>
//   );
// };

// export default PanoramaViewer;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeSixtyViewer = ({ imageUrl }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene & Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 0.01); // Small offset to avoid clipping

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Load Texture Correctly
    const texture = new THREE.TextureLoader().load(imageUrl, () => {
      texture.mapping = THREE.EquirectangularReflectionMapping; // Ensures correct wrapping
      texture.colorSpace = THREE.SRGBColorSpace;
    });

    // Create Sphere for Panorama View
    const geometry = new THREE.SphereGeometry(10, 64, 64); // Smaller and smoother
    geometry.scale(-1, 1, 1); // Flip the sphere inside-out

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Orbit Controls for 360 Interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controls.autoRotate = false; // Set true for slow rotation

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [imageUrl]);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeSixtyViewer;

// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import React, { useEffect, useRef, useState } from "react";

// const ThreeSixtyViewer = ({ imageUrl }) => {
//   const mountRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene, Camera, Renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create Sphere for Panorama
//     const geometry = new THREE.SphereGeometry(500, 60, 40);
//     geometry.scale(-1, 1, 1); // Invert sphere

//     const texture = new THREE.TextureLoader().load(imageUrl);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     const sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     camera.position.set(0, 0, 0.1);

//     // Mouse Movement Controls
//     const onMouseDown = (event) => {
//       setIsDragging(true);
//       setLastMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     const onMouseUp = () => {
//       setIsDragging(false);
//     };

//     const onMouseMove = (event) => {
//       if (!isDragging) return;

//       const deltaX = event.clientX - lastMousePosition.x;
//       const deltaY = event.clientY - lastMousePosition.y;

//       // Horizontal 360° rotation (X-axis)
//       camera.rotation.y -= deltaX * 0.002;

//       // Vertical 180° rotation (Y-axis, limited)
//       const newRotationX = camera.rotation.x - deltaY * 0.002;
//       camera.rotation.x = Math.max(
//         -Math.PI / 2,
//         Math.min(Math.PI / 2, newRotationX)
//       );

//       setLastMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     mountRef.current.addEventListener("mousedown", onMouseDown);
//     window.addEventListener("mouseup", onMouseUp);
//     window.addEventListener("mousemove", onMouseMove);

//     // Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Resize Handling
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//       window.removeEventListener("mouseup", onMouseUp);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [imageUrl]);

//   return (
//     <div
//       ref={mountRef}
//       style={{ width: "100vw", height: "100vh", cursor: "grab" }}
//     />
//   );
// };

// export default ThreeSixtyViewer;
