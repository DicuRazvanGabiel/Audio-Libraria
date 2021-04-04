import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";
import TrackPlayer from "react-native-track-player";
import { Button } from "react-native-paper";
const db = firestore();

export default function Player({ route }) {
	const [loading, setLoading] = useState(true);
	const book = route.params.book;

	const setUp = async () => {
		const state = await TrackPlayer.getState();
		if (state === TrackPlayer.STATE_PLAYING) {
			TrackPlayer.destroy();
		}

		await TrackPlayer.setupPlayer();

		let trackArray = [];

		book.chapters.map((c) => {
			trackArray.push({
				id: c.name,
				url: c.file.src,
				title: c.name,
				artist: "deadmau5",
				duration: c.duration,
				artwork: book.image.src,
			});
		});
		await TrackPlayer.add(trackArray);
		const position = await TrackPlayer.getPosition();
		const duration = await TrackPlayer.getDuration();
		console.log(position);
		console.log(duration);
		setLoading(false);
	};

	useEffect(() => {
		setUp();
	}, [book]);

	if (loading) {
		return <LoadingState />;
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-evenly",
				alignItems: "center",
			}}
		>
			<Button
				icon="play"
				mode="contained"
				onPress={() => TrackPlayer.play()}
			>
				Play
			</Button>
			<Button
				icon="pause"
				mode="contained"
				onPress={() => TrackPlayer.pause()}
			>
				Pause
			</Button>
			<Button
				icon="stop"
				mode="contained"
				onPress={() => TrackPlayer.stop()}
			>
				Stop
			</Button>
		</View>
	);
}
