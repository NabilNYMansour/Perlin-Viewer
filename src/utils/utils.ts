import { Vector3 } from "three";

export const vector3ToRgbString = (vector: Vector3) => {
    // Ensure vector components are within the valid range [0, 1]
    const r = Math.min(Math.max(vector.x, 0), 1) * 255;
    const g = Math.min(Math.max(vector.y, 0), 1) * 255;
    const b = Math.min(Math.max(vector.z, 0), 1) * 255;
    return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;
}

// Function to convert RGB string to THREE.Vector3
export const rgbStringToVector3 = (rgbString: string) => {
    const match = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (match) {
        const r = parseInt(match[1]) / 255;
        const g = parseInt(match[2]) / 255;
        const b = parseInt(match[3]) / 255;
        return new Vector3(r, g, b);
    } else {
        throw new Error('Invalid RGB string format');
    }
}