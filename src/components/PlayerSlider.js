import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Slider from "@react-native-community/slider";
import { useProgress } from "react-native-track-player";
import TrackPlayer from "react-native-track-player";
import { Text } from "react-native-paper";
import { ThemeContext } from "../Context/ThemeContext";

import { convertMinutesHours } from "../Utils";

export default function PlayerSlider() {
	const { isThemeDark } = React.useContext(ThemeContext);
	const { position, duration } = useProgress(100);
	const [slidingStart, setSlidingStart] = useState(false);
	const [valueChange, setValueChange] = useState(0);

	const handleSlidingStop = (newPosition) => {
		TrackPlayer.seekTo(newPosition);
		setSlidingStart(false);
	};

	return (
		<View
			style={styles.container}
		>
			<View style={styles.sliderContainer}>
				<Slider
					minimumValue={0}
					maximumValue={duration}
					minimumTrackTintColor="rgba(254,182,101,1)"
					maximumTrackTintColor={isThemeDark ? "#fff" : "#000000"}
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
			</View>
			<View style={styles.timeContainer}>
				<Text>
					{convertMinutesHours(Math.round(position))}
				</Text>
				<Text >
					{convertMinutesHours(Math.round(duration))}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sliderContainer: {
		flex: 1,
		width: '100%',
		paddingBottom: Platform.OS === 'android' ? 25 : 40
	},
	timeContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent:'space-between',
	
	}
})