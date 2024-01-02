import { type FC } from "react";
import {
	AccumulativeShadows,
	Environment,
	OrbitControls,
	PerspectiveCamera,
	Plane,
	RandomizedLight,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Planet } from "../components";

const degreesToRadians = (degrees: number) => (degrees % 360) * (Math.PI / 180);

const Scene: FC = () => {
	return (
		<Canvas
			className="three-canvas"
			style={{ width: "100vw", height: "100vh", position: "absolute" }}
			shadows
		>
			<color attach="background" args={["#f0f0f0"]} />
			<ambientLight intensity={Math.PI / 2} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={3}
				castShadow
			/>
			<Planet position={[-2, 0, 0]} />
			<Planet position={[2, 0, 0]} />
			<Plane
				args={[10, 10]}
				rotation={[Math.PI / 2, 0, 0]}
				position={[0, -1, 0]}
				receiveShadow
			>
				<meshStandardMaterial color="f0f0f0" side={2} />
			</Plane>
			<Environment
				files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
				blur={0}
			/>
			<PerspectiveCamera position={[0, 5, 5]} fov={45} />
			<OrbitControls
				makeDefault
				enableDamping={false}
				enablePan={false}
				minPolarAngle={degreesToRadians(0)}
				maxPolarAngle={degreesToRadians(135)}
				minDistance={2.5}
				maxDistance={7.5}
			/>
		</Canvas>
	);
};

export default Scene;
