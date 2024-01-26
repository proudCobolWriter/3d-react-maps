import { type FC, useRef, useState } from "react";
import { Vector3, useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

import CustomShaderMaterial from "three-custom-shader-material";

import atmosphereVertexShader from "./glsl/atmosphere.vertex.glsl?raw";
import atmosphereFragmentShader from "./glsl/atmosphere.frag.glsl?raw";
import oceanWavesVertexShader from "./glsl/oceanWaves.vertex.glsl?raw";

import meshUrl from "../assets/models/earth.glb?url";
import { useGLTF } from "@react-three/drei";

import { Marker } from "../components";

interface IPlanetProps {
	position?: Vector3;
}

type GLTFResult = GLTF & {
	nodes: { World002: THREE.Mesh };
	materials: {};
};

const hexToRgb = (hex: string): Array<number> => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result
		? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].map(
				(x) => x / 255
		  )
		: [0, 0, 0];
};

const Planet: FC<IPlanetProps> = (props) => {
	const ref = useRef<THREE.Mesh>(null!);
	const oceanMaterialRef = useRef<THREE.ShaderMaterial>(null!);

	const { nodes } = useLoader(GLTFLoader, meshUrl) as GLTFResult;

	const { color, roughness } = import.meta.env.DEV
		? useControls({
				color: "#1f89b7",
				roughness: { value: 0, min: 0, max: 1 },
		  })
		: {
				color: "#1f89b7",
				roughness: 0,
		  };

	useFrame((state, delta) => {
		if (oceanMaterialRef.current) {
			oceanMaterialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
		}

		if (ref.current) {
			ref.current.rotation.x += delta * 0;
			ref.current.rotation.y += delta * 0;
		}
	});

	const [items, setItems] = useState<Array<{ position?: Vector3 }>>([]);

	return (
		<>
			<mesh
				geometry={nodes.World002.geometry}
				castShadow
				receiveShadow
				scale={[5, 5, 3.75]}
				position={[0, 0, 0.8]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshStandardMaterial color={"green"} flatShading />
			</mesh>
			<mesh
				{...props}
				ref={ref}
				scale={1}
				castShadow
				receiveShadow
				onClick={(event) => {
					const quaternion = new THREE.Quaternion();
					quaternion.setFromUnitVectors(
						new THREE.Vector3(0, 0, 0),
						new THREE.Vector3(event.point.x, event.point.y, event.point.z)
					);

					setItems((state) => [
						...state,
						{
							position: event.point.add(new THREE.Vector3(0, 0.2, 0)),
							quaternion,
						},
					]);
				}}
			>
				<icosahedronGeometry args={[1, 5]} />
				<CustomShaderMaterial
					ref={oceanMaterialRef}
					baseMaterial={THREE.MeshStandardMaterial}
					uniforms={{
						u_amplitude: { value: 2.0 },
						u_time: { value: 0.0 },
					}}
					vertexShader={oceanWavesVertexShader}
					flatShading={true}
					color={color}
					roughness={roughness}
				/>
			</mesh>
			<mesh {...props} scale={1.15}>
				<icosahedronGeometry args={[1, 6]} />
				<shaderMaterial
					fragmentShader={atmosphereFragmentShader}
					vertexShader={atmosphereVertexShader}
					uniforms={{
						u_atmosphere_color: {
							value: hexToRgb("#4c99ff"),
						},
					}}
					side={THREE.BackSide}
					blending={THREE.AdditiveBlending}
					transparent={true}
					dithering={true}
				/>
			</mesh>
			{...items.map((props, i) => <Marker key={i} {...props} />)}
		</>
	);
};

export default Planet;

useGLTF.preload(meshUrl);
