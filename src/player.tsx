/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import "./style.css";

interface VideoPlayerProps {
    options: {
		autoplay: boolean;
		sources: Array<unknown>;
	};
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
	const videoRef = React.useRef(null);
	const playerRef = React.useRef(null);
	const { options } = props;

	React.useEffect(() => {
		if (!playerRef.current) {
			const videoElement = document.createElement("video-js");

			videoElement.classList.add("vjs-big-play-centered");
			videoElement.classList.add("vjs-default-skin");
            // @ts-ignore
			videoRef.current.appendChild(videoElement);
// @ts-ignore
			playerRef.current = videojs(videoElement, options);
		} else {
			const player = playerRef.current;
// @ts-ignore
			player.autoplay(options.autoplay);
            // @ts-ignore
			player.src(options.sources);
		}
	}, [options, videoRef]);

	React.useEffect(() => {
		const player = playerRef.current;

		return () => {
            // @ts-ignore
			if (player && !player.isDisposed()) {
                // @ts-ignore
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div data-vjs-player>
			<div ref={videoRef} />
		</div>
	);
};
