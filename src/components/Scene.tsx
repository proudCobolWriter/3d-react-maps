import { Suspense, type FC } from "react";
import {
	ContactShadows,
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { Planet, Stars } from "../components";

const Scene: FC = () => {
	return (
		<Suspense fallback={null}>
			<Canvas
				className="three-canvas prevent-select"
				style={{ position: "absolute", width: "100vw", height: "90vh" }}
				shadows
			>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					decay={0}
					intensity={3}
				/>
				<Planet />
				<ContactShadows
					frames={1}
					scale={10}
					position={[0, -2.0, 0]}
					far={2.0}
					blur={5}
					opacity={0.3}
					color="#204080"
				/>
				<Stars />
				<Environment preset="city" blur={0} />
				<OrbitControls
					makeDefault
					enableDamping={false}
					enablePan={false}
					minPolarAngle={THREE.MathUtils.degToRad(0)}
					maxPolarAngle={THREE.MathUtils.degToRad(135)}
					minDistance={1.5}
					maxDistance={7.5}
					autoRotate={true}
					autoRotateSpeed={0.5}
				/>
				<PerspectiveCamera makeDefault position={[0, 2.5, 2.5]} fov={45} />
			</Canvas>
		</Suspense>
	);
};

export default Scene;
