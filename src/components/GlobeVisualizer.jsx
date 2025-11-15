import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import GlassCard from "./GlassCard";

// Convert lat/lng to XYZ coordinate on the sphere
function latLngToXYZ(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

// Rotating Earth Mesh + Hotspots
function Earth({ hotspots }) {
  const ref = useRef();
  const texture = useTexture("/world_map.png");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={ref}>
      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Hotspot markers */}
      {hotspots.map((h, idx) => {
        const [x, y, z] = latLngToXYZ(h.lat, h.lng, 2.05);

        return (
          <mesh key={idx} position={[x, y, z]}>
            {/* Main hotspot sphere */}
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
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [co2Response, countriesResponse] = await Promise.all([
          fetch("https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv"),
          fetch("https://raw.githubusercontent.com/mledoze/countries/master/countries.json"),
        ]);

        const co2Text = await co2Response.text();
        const countries = await countriesResponse.json();

        // Simple CSV parsing
        const rows = co2Text.split('\n').slice(1);
        const co2Data = rows.map(row => {
          const [country, year, iso_code, population, gdp, co2] = row.split(',');
          return { country, year: parseInt(year), co2: parseFloat(co2) };
        });

        const latestYear = Math.max(...co2Data.filter(d => d.year).map(d => d.year));
        const latestCo2Data = co2Data.filter(d => d.year === latestYear && d.co2 > 0);

        const countryCoords = countries.reduce((acc, c) => {
          acc[c.name.common] = c.latlng;
          return acc;
        }, {});

        const maxCo2 = Math.max(...latestCo2Data.map(d => d.co2));

        const hotspotsData = latestCo2Data
          .map(({ country, co2 }) => {
            const coords = countryCoords[country];
            if (coords) {
              return {
                lat: coords[0],
                lng: coords[1],
                intensity: co2 / maxCo2, // Normalize intensity
              };
            }
            return null;
          })
          .filter(Boolean);

        setHotspots(hotspotsData);
      } catch (error) {
        console.error("Error fetching globe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <GlassCard className="p-4 sm:p-6 md:p-8">
      <h3 className="text-lg sm:text-xl md:text-2xl text-neon mb-2">
        🌍 Global Carbon Glimpse
      </h3>

      <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">
        A stylized 3D globe showing carbon intensity hotspots across the planet.
      </p>

      {/* Responsive 3D Container */}
      <div
        className="
          w-full 
          h-64 sm:h-72 md:h-96 
          rounded-xl 
          overflow-hidden 
          bg-black/60 
          border border-green-400/20
        "
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-300 animate-pulse">Loading globe data...</p>
          </div>
        ) : (
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />

            <Earth hotspots={hotspots} />

            {/* Zoom disabled for UX; rotate enabled on touch */}
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        )}
      </div>
    </GlassCard>
  );
}
