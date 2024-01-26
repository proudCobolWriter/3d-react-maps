varying vec3 vertexNormal;

uniform vec3 u_atmosphere_color;

void main() {
	float intensity = pow(0.5 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);

    gl_FragColor = vec4(u_atmosphere_color, 1.0) * intensity;
}