import { useRef, type FC, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const random = (min: number = 0, max: number = 1) => min + (max - min) * Math.random();

const clampMagnitude = (vector: Array<number>, minDistance: number) => {
	// not very elegant nor performant solution but whatever
	let magnitude = Math.sqrt(
		Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2)
	);

	if (magnitude < minDistance) {
		let unit = [vector[0] / magnitude, vector[1] / magnitude, vector[2] / magnitude];
		return [unit[0] * minDistance, unit[1] * minDistance, unit[2] * minDistance];
	}

	return vector;
};

let possibleStarsColors = [
	"lightpink",
	"lightblue",
	"lightskyblue",
	"cyan",
	"violet",
	"hotpink",
]; // X11 three color names

let possibleMaterials: Array<THREE.MeshBasicMaterial> = [];
possibleStarsColors.forEach((x) => {
	possibleMaterials.push(new THREE.MeshBasicMaterial({ color: new THREE.Color(x) }));
});

const Stars: FC = () => {
	const group = useRef<THREE.Group>(null!);

	useFrame((state) => {
		if (group.current) {
			const r = Math.sin(THREE.MathUtils.degToRad(state.clock.elapsedTime));

			group.current.rotation.set(0, r, 0);
		}
	});

	const [geo, coords] = useMemo(() => {
		const geo = new THREE.SphereGeometry(1, 7, 7);
		const coords = new Array(1000)
			.fill(0, 0, 1000)
			.map(() =>
				clampMagnitude([random(-50, 50), random(-50, 50), random(-50, 50)], 10)
			);

		return [geo, coords];
	}, []);

	return (
		<group ref={group}>
			{coords.map(([p1, p2, p3], i) => (
				<mesh
					key={i}
					scale={random(0.01, 0.05)}
					geometry={geo}
					material={
						possibleMaterials[Math.floor(random(0, possibleMaterials.length))]
					}
					position={[p1, p2, p3]}
				/>
			))}
		</group>
	);
};

export default Stars;
