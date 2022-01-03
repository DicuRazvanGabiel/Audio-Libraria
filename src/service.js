import TrackPlayer, {Capability} from "react-native-track-player";
module.exports = async function () {
	TrackPlayer.updateOptions({
		stopWithApp: true,
		capabilities: [
			Capability.Play,
			Capability.Stop,
			Capability.Pause,
		],
		notificationCapabilities: [
			Capability.Play,
			Capability.Stop,
			Capability.Pause,
		],
		compactCapabilities: [
			Capability.Play,
			Capability.Pause,
		],
	});

	TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());
	TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());
	TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());
};
