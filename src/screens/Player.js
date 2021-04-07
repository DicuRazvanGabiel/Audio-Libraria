import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";
import TrackPlayer from "react-native-track-player";
import { Button, IconButton, Colors, Text } from "react-native-paper";

const db = firestore();

export default function Player({ route }) {
	const [loading, setLoading] = useState(true);
	const [playerState, setPlayerState] = useState("play");
	const book = route.params.book;

	const setUp = async () => {
		const state = await TrackPlayer.getState();
		//trebuie check pentru pause state
		if (
			state === TrackPlayer.STATE_PLAYING ||
			state === TrackPlayer.STATE_PAUSED
		) {
			TrackPlayer.stop();
			TrackPlayer.destroy();
			console.log("destroy");
		}
		const author = await db.collection("authors").doc(book.authors).get();
		console.log(state);
		await TrackPlayer.setupPlayer();

		let trackArray = [];
		book.chapters.map((c) => {
			trackArray.push({
				id: c.name,
				url: c.file.src,
				title: c.name,
				artist: author.data().name,
				duration: c.duration,
				artwork: book.image.src,
			});
		});
		await TrackPlayer.add(trackArray);

		TrackPlayer.play();
		setPlayerState("play");
		setLoading(false);
	};

	useEffect(() => {
		setUp();
	}, [route, book]);

	if (loading) {
		return <LoadingState />;
	}

	const handlePlayPauseButton = () => {
		if (playerState === "play") {
			TrackPlayer.pause();
			setPlayerState("pause");
		}

		if (playerState === "pause") {
			TrackPlayer.play();
			setPlayerState("play");
		}
	};

	const handleSeek = async (seek) => {
		const position = await TrackPlayer.getPosition();
		const duration = await TrackPlayer.getDuration();
		let newPosition = position + seek;

		if (newPosition > duration) {
			newPosition = duration;
		}

		if (newPosition <= 0) {
			newPosition = 0;
		}

		TrackPlayer.seekTo(newPosition);
	};

	return (
		<View style={styles.container}>
			<Text>{book.title}</Text>

			<View style={styles.mediaPleyerControls}>
				<IconButton
					icon="skip-previous-circle-outline"
					color={Colors.red500}
					size={playerIconSize}
					onPress={() => TrackPlayer.skipToPrevious()}
				/>

				<IconButton
					icon="rewind-10"
					color={Colors.red500}
					size={playerIconSize}
					onPress={() => handleSeek(-10)}
				/>

				<IconButton
					icon={
						playerState === "play"
							? "pause-circle-outline"
							: "play-circle-outline"
					}
					color={Colors.red500}
					size={playerIconSize + 15}
					onPress={handlePlayPauseButton}
				/>

				<IconButton
					icon="fast-forward-10"
					color={Colors.red500}
					size={playerIconSize}
					onPress={() => handleSeek(10)}
				/>

				<IconButton
					icon="skip-next-circle-outline"
					color={Colors.red500}
					size={playerIconSize}
					onPress={() => TrackPlayer.skipToNext()}
				/>
			</View>
		</View>
	);
}

const playerIconSize = 40;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	mediaPleyerControls: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
