varying vec3 vPos;
uniform int u_lod;

void main() {

    // projectionMatrix, modelViewMatrix, position -> passed in from Three.js but linter does not know that so ignore error

    vec3 pos = position;

    pos.z += noise(pos.xy);
    if(u_lod > 0) {
        pos.z -= noise(pos.xy * 2.) / 2.;
    }
    if(u_lod > 1) {
        pos.z += noise(pos.xy * 5.) / 5.;
    }

    vec4 result = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);

    gl_Position = result;
    vPos = pos;
}