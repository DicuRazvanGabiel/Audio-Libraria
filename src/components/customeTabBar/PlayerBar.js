import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
	Text,
	Divider,
	useTheme,
	IconButton,
	Surface,
	Colors,
} from "react-native-paper";
import TrackPlayer from "react-native-track-player";

import { PlayerContext } from "../../Context/PlayerContext";

export default function PlayerBar({ navigation }) {
	const { player } = useContext(PlayerContext);
	const [playerState, setPlayerState] = useState("play");

	useEffect(() => {
		const listenerStateChange = TrackPlayer.addEventListener(
			"playback-state",
			async (state) => {
				setPlayerState(state["state"]);
			}
		);

		return () => {
			listenerStateChange.remove();
		};
	}, [player]);

	if (!player) return <View />;
	return (
		<Surface
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<TouchableOpacity
				style={{ flexDirection: "row", marginLeft: 5 }}
				onPress={() => navigation.navigate("Player")}
			>
				<Image
					source={{
						uri: player.bookImage,
					}}
					style={{
						height: 70,
						width: 50,
						resizeMode: "contain",
					}}
				/>
				<View style={{ margin: 5 }}>
					<Text>{player.bookTitle}</Text>
					<Text>{player.chapter}</Text>
				</View>
			</TouchableOpacity>
			<IconButton
				icon={
					playerState === TrackPlayer.STATE_PLAYING ? "pause" : "play"
				}
				color={Colors.red500}
				size={30}
				onPress={async () => {
					const state = await TrackPlayer.getState();
					if (state === TrackPlayer.STATE_PLAYING) {
						TrackPlayer.pause();
					}

					if (state === TrackPlayer.STATE_PAUSED) {
						TrackPlayer.play();
					}
				}}
			/>
		</Surface>
	);
}
