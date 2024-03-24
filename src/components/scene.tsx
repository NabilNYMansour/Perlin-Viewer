import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { Stats } from '@react-three/drei';

export const Scene = ({ size, segments, wireframeMode, noiseLod }:
  { size: number, segments: number, wireframeMode: boolean, noiseLod: 0 | 1 | 2 }
) => {
  const [perlinCode, setPerlinCode] = useState<string>('');
  const [vertCode, setVertCode] = useState<string>('');
  const [fragCode, setFragCode] = useState<string>('');

  const uniforms = useMemo(() => {
    return {
      u_lod: {
        type: 'i',
        value: noiseLod,
      },
    };
  }, [noiseLod]);

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

  const planeGeom = useMemo(() => new PlaneGeometry(size, size, segments, segments),
    [size, segments]
  );

  const planeMat = useMemo(() => // could be recompiling shadercode!
    new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: perlinCode + vertCode,
      fragmentShader: fragCode,
      wireframe: wireframeMode,
      side: DoubleSide
    }), [uniforms, perlinCode, vertCode, fragCode, wireframeMode]
  );

  // const meshRef = useRef<Mesh>(null);

  // useFrame((state) => {
  //   if (meshRef.current && meshRef.current.material) {
  //     // Update the uniforms of the shader material
  //     meshRef.current.material.uniforms.u_lod.value = noiseLod;
  //     meshRef.current.material.uniformsNeedUpdate = true;
  //   }
  // });

  return <div className="canvas-container">
    <Canvas camera={{ position: [0, 0, 30], fov: 17.5, near: 1, far: 200 }}>
      <OrbitControls target={[0, 0, 0]} maxDistance={100} minDistance={10} />
      {/* <ambientLight intensity={0.05} /> */}
      {/* <directionalLight position={[1, 1, 1]} /> */}
      <mesh geometry={planeGeom} material={planeMat} />
      <Stats className="stats" />
    </Canvas>
  </div>
}


export default Scene;
