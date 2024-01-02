import { type FC, useRef } from "react";
import { Vector3, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";

interface IPlanetProps {
	position: Vector3;
}

const Planet: FC<IPlanetProps> = (props: IPlanetProps) => {
	const ref = useRef<THREE.Mesh>(null!);

	const { useTransmission, color } = useControls({
		useTransmission: true,
		color: "#ff8000",
	});

	const { distortion, thickness, anisotropy } = useControls("Transmission", {
		distortion: { value: 0.25, min: 0, max: 5 },
		thickness: { value: 1, min: 0, max: 5 },
		anisotropy: { value: 1, min: 0, max: 5 },
	});

	const { metalness, roughness } = useControls("Metalness", {
		metalness: { value: 0.9, min: 0, max: 1 },
		roughness: { value: 0.1, min: 0, max: 1 },
	});

	useFrame((_, delta) => {
		ref.current.rotation.x += delta / 5;
		ref.current.rotation.y += delta / 5;
	});

	return (
		<mesh {...props} ref={ref} scale={1} castShadow receiveShadow>
			<sphereGeometry args={[1, 64, 64]} />
			{useTransmission ? (
				<MeshTransmissionMaterial
					resolution={1024}
					distortion={distortion}
					distortionScale={1}
					temporalDistortion={0}
					color={color}
					thickness={thickness}
					anisotropy={anisotropy}
				/>
			) : (
				<meshStandardMaterial
					color={color}
					metalness={metalness}
					roughness={roughness}
				/>
			)}
		</mesh>
	);
};

export default Planet;
