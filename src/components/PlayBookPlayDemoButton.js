import React, { useEffect, useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useTrackPlayerProgress } from "react-native-track-player";
import { PlayerContext } from "../Context/PlayerContext";
import TrackPlayer from "react-native-track-player";

export default function PlayBookPlayDemoButton({
	navigation,
	borrowedBook,
	playBook,
}) {
	const { position, buffered, duration } = useTrackPlayerProgress(500);
	const { player } = useContext(PlayerContext);
	const [playerState, setPlayerState] = useState(null);
	if (position > 60 && !player) {
		TrackPlayer.stop();
		TrackPlayer.destroy();
	}

	useEffect(() => {
		const listenerStateChange = TrackPlayer.addEventListener(
			"playback-state",
			async (state) => {
				if (!player) setPlayerState(state["state"]);
			}
		);

		const unsubscribe = navigation.addListener("beforeRemove", async () => {
			if (!player) {
				listenerStateChange.remove();
				await TrackPlayer.stop();
				await TrackPlayer.destroy();
			}
		});

		return () => {
			unsubscribe();
		};
	}, [player]);

	return (
		<TouchableOpacity style={styles.demoPlayerContainer} onPress={playBook}>
			<Text style={{ color: "#000", marginLeft: 15 }}>
				{borrowedBook ? "Asculta cartea" : "Asculta demo"}
			</Text>
			<View style={{ right: -3, top: -1 }}>
				<AntDesign
					name={
						playerState === TrackPlayer.STATE_PLAYING
							? "pausecircle"
							: "play"
					}
					size={32}
					color="#8743FF"
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	demoPlayerContainer: {
		backgroundColor: "#fff",
		flex: 1,
		height: 30,
		borderRadius: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginRight: 30,
	},
});
