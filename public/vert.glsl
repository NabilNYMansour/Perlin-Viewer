varying vec3 vPos;
uniform int u_lod;
uniform float u_offset;

void main() {

    // projectionMatrix, modelViewMatrix, position -> passed in from Three.js but linter does not know that so ignore error

    vec3 pos = position;
    vec2 seed = pos.xy + u_offset;

    pos.z += noise(seed);
    if(u_lod > 0) {
        pos.z -= noise(seed * 2.) / 2.;
    }
    if(u_lod > 1) {
        pos.z += noise(seed * 4.) / 4.;
    }
    if(u_lod > 2) {
        pos.z += noise(seed * 6.) / 6.;
    }

    vec4 result = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);

    gl_Position = result;
    vPos = pos;
}