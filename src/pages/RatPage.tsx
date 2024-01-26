import { type FC, Suspense, useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

import { Rat, Loader } from "../components";

// Metadata

const { type, title, description } = {
	type: "a",
	title: "a",
	description: "a",
};

const RatPage: FC = () => {
	const textMatRef = useRef(null!);
	const tl = gsap.timeline();

	const [hasInteracted, setInteracted] = useState(false);

	useEffect(() => {
		if (hasInteracted) return;

		const interacted = () => {
			setInteracted(true);
		};

		const intervalId = setInterval(() => {
			if (navigator.userActivation && navigator.userActivation.hasBeenActive) {
				setInteracted(true);
			}
		}, 500);

		window.addEventListener("click", interacted, true);

		return () => {
			window.removeEventListener("click", interacted);
			clearInterval(intervalId);
		};
	}, [hasInteracted]);

	useEffect(() => {
		if (tl.isActive()) return;
		const intervalId = setInterval(() => {
			if (!textMatRef.current) return;

			tl.to(textMatRef.current, {
				keyframes: {
					"0%": { opacity: 1 },
					"50%": { opacity: 0.3 },
					"100%": { opacity: 1 },
				},
				ease: "linear",
				duration: 3,
				repeat: -1,
			});

			console.log("GSAP Animation is playing!");
			clearInterval(intervalId);
		}, 250);

		return () => clearInterval(intervalId);
	}, [textMatRef]);

	return (
		<>
			<Helmet>
				<title>Spinning rat</title>
				<meta property="og:type" content={type} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
			</Helmet>
			<Loader />
			<Suspense fallback={null}>
				<Canvas
					className="three-canvas"
					style={{ position: "absolute", width: "100vw", height: "90vh" }}
					shadows
				>
					{!hasInteracted ? (
						<Text
							position={[0, -0.1, -1]}
							scale={0.075}
							rotation={[THREE.MathUtils.degToRad(-10), 0, 0]}
							anchorX={"center"}
						>
							click the screen to{"\n"}
							{" ".repeat(4)}play the song
							<meshBasicMaterial
								ref={textMatRef}
								color={"#ffffff"}
								opacity={1}
							/>
						</Text>
					) : null}
					<Rat />
					<ambientLight intensity={1} />
					<spotLight
						position={[5, 5, 5]}
						angle={0.3}
						penumbra={1}
						decay={0}
						intensity={1}
					/>
					<ContactShadows
						scale={8}
						position={[0, -0.6, 0]}
						far={2.0}
						blur={5}
						opacity={1}
						color="#ffffff"
					/>
					<PerspectiveCamera
						makeDefault
						position={[0, 0.5, 0]}
						rotation={[THREE.MathUtils.degToRad(-12), 0, 0]}
						fov={50}
					/>
				</Canvas>
			</Suspense>
		</>
	);
};

export default RatPage;
