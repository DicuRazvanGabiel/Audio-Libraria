import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
	Text,
	IconButton,
	Surface,
	Colors,
} from "react-native-paper";
import TrackPlayer, { useTrackPlayerEvents, Event, State } from "react-native-track-player";
import { PlayerContext } from "../../Context/PlayerContext";

export default function PlayerBar({ navigation }) {
	const { player } = useContext(PlayerContext);
	const [playerState, setPlayerState] = useState();

	const setup = async () => {
		const state = await TrackPlayer.getState();
		setPlayerState(state)
	}

	useEffect(() => {
		setup()
	}, [player]);

	useTrackPlayerEvents([Event.PlaybackState], async (event) => {
		if (event.type === Event.PlaybackState) {
			setPlayerState(event.state);
		}
		const state = await TrackPlayer.getState();
		setPlayerState(state)
	});

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
						uri: player.bookInfo.imageSrc,
					}}
					style={{
						height: 70,
						width: 50,
						resizeMode: "contain",
					}}
				/>
				<View style={{ margin: 5 }}>
					<Text>{player.bookInfo.title}</Text>
					<Text>{player.chapter}</Text>
				</View>
			</TouchableOpacity>
			<IconButton
				icon={
					playerState === State.Playing ? "pause" : "play"
				}
				color={Colors.red500}
				size={30}
				onPress={async () => {
					const state = await TrackPlayer.getState();
					
					if (state === State.Playing) {
						TrackPlayer.pause();
					}

					if (state === State.Paused) {
						console.log("aici")
						TrackPlayer.play();
					}
				}}
			/>
		</Surface>
	);
}
