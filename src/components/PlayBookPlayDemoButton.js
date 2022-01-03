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
	icon
}) {

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener("beforeRemove", async () => {
	// 		if (!player) {
	// 			await TrackPlayer.reset();
				
	// 		}
	// 	});

	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, [player]);

	// const getIconName = () => {
	// 	if((playerState === State.Playing || playerState === State.Ready) && !player) return "stop"
	// 	return "play"
	// }

	return (
		<View style={{marginTop: 10}}>
			<Button icon={icon} mode="contained" onPress={() => playBook()}>
					{borrowedBook ? "Asculta cartea" : "Asculta demo"}
			</Button>
		</View>
	);
}