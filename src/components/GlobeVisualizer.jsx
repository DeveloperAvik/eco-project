import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import GlassCard from "./GlassCard";

// lat/lng to 3D coords on a sphere
function latLngToXYZ(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

function Earth({ hotspots }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0025;
    }
  });

  return (
    <group ref={ref}>
      {/* Globe wireframe */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#020617"
          emissive="#00ff9c"
          emissiveIntensity={0.08}
          wireframe
        />
      </mesh>

      {/* Hotspots */}
      {hotspots.map((h, idx) => {
        const [x, y, z] = latLngToXYZ(h.lat, h.lng, 2.05);
        return (
          <mesh key={idx} position={[x, y, z]}>
            <sphereGeometry args={[0.06 + h.intensity * 0.02, 16, 16]} />
            <meshStandardMaterial
              color="#00ff9c"
              emissive="#00ff9c"
              emissiveIntensity={0.8 + h.intensity * 0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function GlobeVisualizer() {
  // Fake planetary carbon hotspots
  const hotspots = [
    { lat: 37.7749, lng: -122.4194, intensity: 0.9 }, // SF
    { lat: 51.5074, lng: -0.1278, intensity: 0.7 },   // London
    { lat: 28.6139, lng: 77.209, intensity: 0.8 },    // Delhi
    { lat: 35.6895, lng: 139.6917, intensity: 0.6 },  // Tokyo
    { lat: -23.5505, lng: -46.6333, intensity: 0.5 }, // São Paulo
  ];

  return (
    <GlassCard>
      <h3 className="text-xl text-neon mb-2">🌍 Global Carbon Glimpse</h3>
      <p className="text-gray-300 text-sm mb-3">
        A stylized 3D globe showing simulated carbon intensity hotspots across the planet.
      </p>
      <div className="w-full h-80 rounded-lg overflow-hidden bg-black/60">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} />
          <Earth hotspots={hotspots} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </GlassCard>
  );
}
