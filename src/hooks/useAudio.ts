import { useState, useEffect } from "react";

const useAudio = (url: string, loop: boolean = false, volume: number = 1) => {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		playing ? audio.play() : audio.pause();
	}, [playing]);

	useEffect(() => {
		audio.loop = loop;
		audio.volume = volume;
		audio.addEventListener("ended", () => setPlaying(false));
		return () => {
			audio.removeEventListener("ended", () => setPlaying(false));
		};
	}, []);

	return { playing, setPlaying };
};

export default useAudio;
