import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { PlaneGeometry } from 'three';

export const Scene = () => {
    const [size, setSize] = useState(5);

    const widthSegments = 10;
    const heightSegments = 10;
    const planeGeom = new PlaneGeometry(size, size, widthSegments, heightSegments);

    return <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 30], fov: 17.5, near: 1, far: 50 }}>
            <OrbitControls />
            <ambientLight intensity={0.05} />
            <directionalLight position={[1, 1, 1]} />
            <mesh geometry={planeGeom}>
                <meshPhongMaterial specular={0xffffff} shininess={20} wireframe={true} />
            </mesh>
        </Canvas>
    </div>
}


export default Scene;
