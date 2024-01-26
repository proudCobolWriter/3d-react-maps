import { useRef, type FC, useEffect, useState } from "react";
import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader, useFrame } from "@react-three/fiber";
import { useAudio } from "../hooks";

import meshUrl from "../assets/models/spinning_rat.glb?url";
import freebirdUrl from "../assets/freebird.mp3?url";

type GLTFResult = GLTF & {
	nodes: { Object_6: THREE.Mesh };
	materials: { lambert2: THREE.MeshStandardMaterial };
};

const Rat: FC = () => {
	// Mesh related
	const ratRef = useRef<THREE.Mesh>(null!);

	const { nodes, materials } = useLoader(GLTFLoader, meshUrl) as GLTFResult;

	useFrame((_, delta) => {
		if (ratRef.current) ratRef.current.rotateY(-delta * 1.5);
	});

	// Audio player
	const { setPlaying } = useAudio(freebirdUrl, true, 0.5);
	const [hasInteracted, setInteracted] = useState(false);

	useEffect(() => {
		const interacted = () => {
			setInteracted(true);
		};
		if (!hasInteracted) window.addEventListener("click", interacted, true);

		return () => {
			window.removeEventListener("click", interacted);
		};
	}, [hasInteracted]);

	useEffect(() => {
		const playSong = () => {
			if (
				(navigator.userActivation === undefined && hasInteracted) ||
				navigator.userActivation.hasBeenActive
			) {
				setPlaying((state) => {
					if (!state) {
						console.log("Song is playing!");
					}
					return true;
				});
			}
		};
		playSong();

		const intervalId = setInterval(playSong, 100);

		return () => {
			clearInterval(intervalId);
			setPlaying(false);
		};
	}, []);

	return (
		<mesh
			geometry={nodes.Object_6.geometry}
			material={materials.lambert2}
			castShadow
			receiveShadow
			position={[0.1, 0, -2.5]}
			scale={[1, 1, 1]}
			ref={ratRef}
		/>
	);
};

export default Rat;
