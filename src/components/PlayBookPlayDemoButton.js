import React, { useEffect, useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useProgress } from "react-native-track-player";
import { PlayerContext } from "../Context/PlayerContext";
import TrackPlayer, { useTrackPlayerEvents, Event, State } from "react-native-track-player";

export default function PlayBookPlayDemoButton({
	navigation,
	borrowedBook,
	playBook,
}) {
	const { position, buffered, duration } = useProgress(500);
	const { player } = useContext(PlayerContext);
	const [playerState, setPlayerState] = useState(null);
	if (position > 60 && !player) {
		TrackPlayer.stop();
		TrackPlayer.destroy();
	}

	useTrackPlayerEvents([Event.PlaybackState], async (event) => {
		const state = await TrackPlayer.getState();
		setPlayerState(event.state)
	});

	useEffect(() => {
		const unsubscribe = navigation.addListener("beforeRemove", async () => {
			if (!player) {
				await TrackPlayer.reset();
				
			}
		});

		return () => {
			unsubscribe();
		};
	}, [player]);

	const getIconName = () => {
		if((playerState === State.Playing || playerState === State.Ready) && !player) return "stop"
		return "play"
	}

	return (
		<View style={{marginTop: 10}}>
			<Button icon={getIconName()} mode="contained" onPress={playBook}>
					{borrowedBook ? "Asculta cartea" : "Asculta demo"}
			</Button>
		{/* <TouchableOpacity style={styles.demoPlayerContainer} onPress={playBook}>
			<Text style={{ color: "#000", marginLeft: 15 }}>
				{borrowedBook ? "Asculta cartea" : "Asculta demo"}
			</Text>
			<View style={{ right: -3, top: -1 }}>
				<AntDesign
					name={getIconName()}
					size={32}
					color="#8743FF"
				/>
			</View>
		</TouchableOpacity> */}
		</View>
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
