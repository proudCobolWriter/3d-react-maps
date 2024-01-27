import { type GroupProps, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useRef, type FC } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import pillarTextureUrl from "../assets/pillar.png?url";
import circleTextureUrl from "../assets/circle.png?url";

const PillarMaterial = (colorMap: THREE.Texture) => {
	return (
		<meshBasicMaterial
			map={colorMap}
			color={"#ffffff"}
			transparent={true}
			side={THREE.DoubleSide}
			depthWrite={false}
		/>
	);
};

const Marker: FC<GroupProps> = (props) => {
	const pillarColorMap = useLoader(TextureLoader, pillarTextureUrl);
	const circleColorMap = useLoader(TextureLoader, circleTextureUrl);

	const { width, height } = { width: 0.2, height: 0.4 };

	const markerSpriteRef = useRef<THREE.MeshBasicMaterial>(null!);

	useGSAP(() => {
		gsap.to([markerSpriteRef], { opacity: 0, duration: 3, repeat: -1 });
	});

	return (
		<group {...props}>
			<mesh>
				<planeGeometry args={[width, height]} />
				{PillarMaterial(pillarColorMap)}
			</mesh>
			<mesh rotation={[0, Math.PI / 2, 0]}>
				<planeGeometry args={[width, height]} />
				{PillarMaterial(pillarColorMap)}
			</mesh>
			<mesh rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[0.2, 0.2]} />
				<meshBasicMaterial
					ref={markerSpriteRef}
					map={circleColorMap}
					transparent={true}
					depthWrite={false}
					opacity={1}
				/>
			</mesh>
		</group>
	);
};

export default Marker;

useLoader.preload(TextureLoader, pillarTextureUrl);
useLoader.preload(TextureLoader, circleTextureUrl);
