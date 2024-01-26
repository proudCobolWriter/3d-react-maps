import { useState, type FC, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import Lottie from "react-lottie";

import earthLoadingAnimationData from "../assets/lotties/earth.json";

const earthLoadingAnimationOptions = {
	loop: true,
	autoplay: true,
	animationData: earthLoadingAnimationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const Loader: FC = () => {
	const { progress } = useProgress();

	const percentage = Math.floor(progress);

	const [fadeOutAnim, setFadeOutAnim] = useState(false);
	const [loaderHidden, hideLoader] = useState(false);
	const [interpolatedPercentage, setInterpolatedPercentage] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (percentage > interpolatedPercentage)
				setInterpolatedPercentage((state) => Math.min(percentage, state + 1));
			else if (interpolatedPercentage > percentage)
				setInterpolatedPercentage((state) => Math.max(percentage, state - 1));
		}, 20);

		return () => {
			clearInterval(intervalId);
		};
	});

	useEffect(() => {
		if (interpolatedPercentage === 100) {
			setFadeOutAnim(true);
			setTimeout(() => {
				hideLoader(true);
			}, 1.25e3);
		}
	}, [interpolatedPercentage]);

	// interesting glowing tapered loading bar design : https://codepen.io/nep_web/pen/NJZjWL
	return loaderHidden ? null : (
		<div
			className={[
				"container",
				"loading-data-container",
				"prevent-select",
				fadeOutAnim ? "fade-out-anim" : undefined,
			].join(" ")}
		>
			<Lottie
				options={earthLoadingAnimationOptions}
				height={200}
				width={200}
				isClickToPauseDisabled={true}
				title={
					"Earth Animation by Moha Moha on LottieFiles (https://lottiefiles.com/animations/earth-loading-UzQCo0eHPk)"
				}
			/>
			<div className={"container"}>
				<div
					className="loading-bar"
					style={{ width: (180 * interpolatedPercentage) / 100 }}
				/>
			</div>
			<div className={"container"}>
				<span>Loading models...</span>
				<span>{interpolatedPercentage}%</span>
			</div>
		</div>
	);
};

export default Loader;
