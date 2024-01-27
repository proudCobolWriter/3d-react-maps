import { useState, type FC } from "react";

// Assets

import fullscreenButton from "../assets/icons/fullscreen.png";
import minimizeButton from "../assets/icons/minimize.png";

const FullscreenButton: FC = () => {
	const [isFullscreen, setFullscreen] = useState(false);

	return (
		<a
			className="fullscreen-button prevent-select prevent-drag"
			onClick={() => {
				setFullscreen((fullscreen) => !fullscreen);
			}}
		>
			<img src={isFullscreen ? minimizeButton : fullscreenButton} />
		</a>
	);
};

export default FullscreenButton;
