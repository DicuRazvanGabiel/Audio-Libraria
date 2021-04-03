import TrackPlayer from "react-native-track-player";
module.exports = async function () {
	TrackPlayer.updateOptions({
		stopWithApp: true,
		capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_STOP,
			TrackPlayer.CAPABILITY_PAUSE,
		],
		notificationCapabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_STOP,
			TrackPlayer.CAPABILITY_PAUSE,
		],
		compactCapabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
		],
	});

	TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());
	TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());
	TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());
};
