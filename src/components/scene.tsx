import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import PlaneMesh from "./planeMesh";
import { useEffect, useState } from "react";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { Vector3 } from "three";

export const Scene = ({ size, segments, wireframeMode, noiseLod, noiseOffset, colors }:
  { size: number, segments: number, wireframeMode: boolean, noiseLod: 0 | 1 | 2 | 3, noiseOffset: number, colors: Vector3[] }
) => {
  // Shader code states
  const [perlinCode, setPerlinCode] = useState<string>('');
  const [vertCode, setVertCode] = useState<string>('');
  const [fragCode, setFragCode] = useState<string>('');

  // Get shaders code
  useEffect(() => {
    const fetchFrag = async (url: string, setFunc: React.Dispatch<React.SetStateAction<string>>) => {
      try {
        const response = await fetch(url); // Path to your file in the public folder
        const text = await response.text();
        setFunc(text);
      } catch (error) {
        console.error('Error reading fragment shader code:', error);
      }
    };

    fetchFrag('/perlin.glsl', setPerlinCode);
    fetchFrag('/vert.glsl', setVertCode);
    fetchFrag('/frag.glsl', setFragCode);
  }, []);

  // check if using phone
  const usingPhone = useMediaQuery('(max-aspect-ratio: 3/4)');

  return <>
    {perlinCode && vertCode && fragCode ? // to make sure shader code is loaded 
      <div className="canvas-container">
        <Canvas camera={{ position: usingPhone ? [10, -60, 44] : [5, -30, 22], fov: 17.5, near: 1, far: 200 }}>
          <OrbitControls target={[0, 0, 0]} maxDistance={100} minDistance={10} />
          <PlaneMesh perlinCode={perlinCode} vertCode={vertCode} fragCode={fragCode}
            size={size} segments={segments} wireframeMode={wireframeMode}
            noiseLod={noiseLod} noiseOffset={noiseOffset} colors={colors} />
        </Canvas>
      </div>
      :
      // if shader code is not loaded yet, show progress
      <div className="loading">
        LOADING
        <CircularProgress size={60} />
      </div>
    }
  </>
}


export default Scene;
