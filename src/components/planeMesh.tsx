import { useEffect, useMemo, useRef } from "react";
import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector3 } from "three";

export const PlaneMesh = ({ size, segments, wireframeMode, noiseLod, noiseOffset, perlinCode, vertCode, fragCode, colors }:
    {
        size: number, segments: number, wireframeMode: boolean, noiseLod: 0 | 1 | 2 | 3, noiseOffset: number
        perlinCode: string, vertCode: string, fragCode: string, colors: Vector3[]
    }
) => {
    // Get mesh reference
    const meshRef = useRef<Mesh>(null);

    // uniforms json init
    const uniforms = useMemo(() => {
        return {
            u_offset: {
                type: 'f',
                value: noiseOffset
            },
            u_lod: {
                type: 'i',
                value: noiseLod,
            },
            u_col1: {
                type: 'v3',
                value: colors[0]
            },
            u_col2: {
                type: 'v3',
                value: colors[1]
            }
        };
    }, [noiseLod, noiseOffset, colors]);

    // Geo init
    const planeGeom = useMemo(() => new PlaneGeometry(size, size, segments, segments),
        [size, segments]
    );

    // Mat init
    const planeMat = useMemo(() =>
        new ShaderMaterial({
            uniforms: uniforms,
            vertexShader: perlinCode + vertCode,
            fragmentShader: fragCode,
            wireframe: wireframeMode,
            side: DoubleSide
        }), [perlinCode, vertCode, fragCode]
    );

    // update uniforms
    useEffect(() => {
        if (meshRef.current && meshRef.current.material) {
            // Update the uniforms of the shader material
            (meshRef.current.material as ShaderMaterial).uniforms.u_lod.value = noiseLod;
            (meshRef.current.material as ShaderMaterial).uniforms.u_offset.value = noiseOffset;
            (meshRef.current.material as ShaderMaterial).uniforms.u_col1.value = colors[0];
            (meshRef.current.material as ShaderMaterial).uniforms.u_col2.value = colors[1];
            // Notify 3JS to update the material
            (meshRef.current.material as ShaderMaterial).uniformsNeedUpdate = true;
        }
    }, [uniforms])

    // update wireframe mode
    useEffect(() => {
        if (meshRef.current && meshRef.current.material) {
            (meshRef.current.material as ShaderMaterial).wireframe = wireframeMode;
        }
    }, [wireframeMode])

    return <mesh geometry={planeGeom} material={planeMat} ref={meshRef} />
}

export default PlaneMesh;
