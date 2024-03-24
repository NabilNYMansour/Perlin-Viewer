precision mediump float;
varying vec3 vPos;
uniform vec3 u_col1;
uniform vec3 u_col2;

void main() {
    vec3 fColor = mix(u_col1, u_col2, vPos.z);
    gl_FragColor = vec4(fColor, 1);
}