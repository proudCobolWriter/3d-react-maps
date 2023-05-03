import type { FC } from "react";
import { Sphere, OrbitControls, Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Scene: FC = () => (
	<Canvas className="three-canvas">
		<Sphere />
		<Box position={[2, 0, 0]}></Box>
		<OrbitControls />
	</Canvas>
);

export default Scene;
