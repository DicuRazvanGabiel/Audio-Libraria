import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
	Text,
	IconButton,
	Surface,
	Divider,
	useTheme
} from "react-native-paper";
import TrackPlayer, { useTrackPlayerEvents, Event, State } from "react-native-track-player";
import { RFPercentage } from "react-native-responsive-fontsize";

import { PlayerContext } from "../../Context/PlayerContext";

export default function PlayerBar({ navigation }) {
	const { player } = useContext(PlayerContext);
	const [playerState, setPlayerState] = useState();
	const theme = useTheme();

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
				width: '100%'
			}}
		>
			<TouchableOpacity
				style={{ flexDirection: "row", marginLeft: 5, flex: 1}}
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
				<View style={{ margin: 5, flex: 1 }}>
					<Text style={{fontSize: RFPercentage(1.8), flexShrink:1 }} numberOfLines={1}>{player.bookInfo.title}</Text>
					<Divider />
					<Text style={{fontSize: RFPercentage(1.7), flexShrink:1 }} numberOfLines={2}>{player.chapter}</Text>
				</View>
			</TouchableOpacity>
			
			<IconButton
				icon={
					playerState === State.Playing ? "pause" : "play"
				}
				color={theme.colors.primary}
				size={30}
				onPress={async () => {
					const state = await TrackPlayer.getState();
					
					if (state === State.Playing) {
						TrackPlayer.pause();
					}

					if (state === State.Paused) {
						TrackPlayer.play();
					}
				}}
			/>
		</Surface>
	);
}
