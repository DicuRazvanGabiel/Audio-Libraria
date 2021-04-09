import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTrackPlayerProgress } from "react-native-track-player";
import TrackPlayer from "react-native-track-player";
import { Text } from "react-native-paper";

export default function PlayerSlider() {
	const { position, bufferedPosition, duration } = useTrackPlayerProgress(
		10,
		null
	);
	const [slidingStart, setSlidingStart] = useState(false);
	const [valueChange, setValueChange] = useState(0);

	const handleSlidingStop = (newPosition) => {
		TrackPlayer.seekTo(newPosition);
		setSlidingStart(false);
	};

	return (
		<View style={{ width: "100%" }}>
			<Text>{Math.round(position)}</Text>
			<Slider
				minimumValue={0}
				maximumValue={duration}
				minimumTrackTintColor="#FFFFFF"
				maximumTrackTintColor="#000000"
				value={slidingStart ? valueChange : position}
				onSlidingComplete={(newPosition) =>
					handleSlidingStop(newPosition)
				}
				onValueChange={(value) => setValueChange(value)}
				onSlidingStart={(initialPosition) => {
					setValueChange(initialPosition);
					setSlidingStart(true);
				}}
			/>
			<Text>{Math.round(duration)}</Text>
		</View>
	);
}
