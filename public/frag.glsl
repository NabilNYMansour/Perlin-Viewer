precision mediump float;
varying vec3 vPos;
uniform int u_lod;

void main() {
    vec3 fColor = mix(vec3(0.5, 0.5, 0), vec3(1, 1, 1), vPos.z);
    gl_FragColor = vec4(fColor, 1);
}