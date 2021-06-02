import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import functions from "@react-native-firebase/functions";
import TrackPlayer from "react-native-track-player";
import { IconButton, Colors, Text } from "react-native-paper";
import PlayerSlider from "./../components/PlayerSlider";
import { Entypo } from "@expo/vector-icons";
import ModalChaptersContent from "../components/ModalChaptersContent";
import Modal from "react-native-modal";

import { saveUserLastPlay } from "../Utils";
import { PlayerContext } from "../Context/PlayerContext";

const db = firestore();

export default function Player({ route }) {
	const [loading, setLoading] = useState(true);
	const [playerState, setPlayerState] = useState("play");
	const [chapter, setChapter] = useState("");
	const [showChaptersModal, setShowChaptersModal] = useState(false);
	const { player, setPlayer } = useContext(PlayerContext);
	const book = route.params.book;

	const setUp = async () => {
		const state = await TrackPlayer.getState();
		setPlayerState(state);

		if (player && player.bookID === book.id) {
			const trackID = await TrackPlayer.getCurrentTrack();
			const currentTrack = await TrackPlayer.getTrack(trackID);
			setChapter(currentTrack.title);
			setLoading(false);
		} else {
			if (
				state === TrackPlayer.STATE_PLAYING ||
				state === TrackPlayer.STATE_PAUSED
			) {
				TrackPlayer.stop();
				TrackPlayer.destroy();
			}
			await TrackPlayer.setupPlayer();

			let trackArray = [];
			book.chapters.map((c) => {
				trackArray.push({
					id: c.name,
					url: c.file.src,
					title: c.name,
					album: book.title,
					artist: book.authors.name,
					duration: c.duration,
					artwork: book.image.src,
				});
			});
			await TrackPlayer.add(trackArray);

			const savedBook = await db
				.collection("users")
				.doc(auth().currentUser.uid)
				.collection("savedBooksPosition")
				.doc(book.id)
				.get();

			if (savedBook.exists) {
				console.log(savedBook.data());
				const lastSavedChapter = savedBook.data().chapter;
				const lastPosition = savedBook.data().positionSeconds;

				await TrackPlayer.skip(lastSavedChapter);
				console.log("aici" + lastPosition);
				await TrackPlayer.play();
				await TrackPlayer.seekTo(lastPosition);
				setChapter(lastSavedChapter);
			} else {
				setPlayer({ bookID: book.id, chapter: trackArray[0].title });
				setChapter(trackArray[0].title);
			}

			TrackPlayer.play();
		}
		setLoading(false);
	};

	useEffect(() => {
		setUp();

		const listenerStateChange = TrackPlayer.addEventListener(
			"playback-state",
			async (state) => {
				setPlayerState(state["state"]);
				if (state["state"] === TrackPlayer.STATE_PAUSED) {
					const positionSeconds = await TrackPlayer.getPosition();
					const track = await TrackPlayer.getCurrentTrack();
					await saveUserLastPlay(
						auth().currentUser.uid,
						book.id,
						track,
						positionSeconds,
						db
					);
				}
			}
		);

		const listenerTrackChange = TrackPlayer.addEventListener(
			"playback-track-changed",
			async (data) => {
				const track = await TrackPlayer.getTrack(data.nextTrack);
				setChapter(track.title);
				setPlayer({ ...player, chapter: track.title });
			}
		);

		return () => {
			listenerTrackChange.remove();
			listenerStateChange.remove();
		};
	}, [book]);

	const handlePlayPauseButton = () => {
		if (playerState === TrackPlayer.STATE_PLAYING) {
			TrackPlayer.pause();
		}

		if (playerState === TrackPlayer.STATE_PAUSED) {
			TrackPlayer.play();
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

	if (loading) {
		return <LoadingState />;
	}

	return (
		<View style={styles.container}>
			<View style={{ width: "100%", alignItems: "flex-end" }}>
				<TouchableOpacity
					style={{ marginLeft: 20 }}
					onPress={() => {
						setShowChaptersModal(true);
					}}
				>
					<Entypo name="list" size={30} color="red" />
				</TouchableOpacity>
			</View>

			<Image
				source={{
					uri: book.image.src,
				}}
				style={{
					height: 350,
					width: 350,
					borderRadius: 15,
					marginBottom: 5,
					resizeMode: "cover",
				}}
			/>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					width: 350,
				}}
			>
				<View>
					<Text
						style={{
							fontSize: 17,
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						{book.title}
					</Text>
					<Text
						style={{
							fontSize: 14,
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						{chapter}
					</Text>
				</View>
			</View>

			<PlayerSlider />

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
						playerState === TrackPlayer.STATE_PLAYING
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

			<Modal
				isVisible={showChaptersModal}
				onRequestClose={() => {
					setShowChaptersModal(false);
				}}
				swipeDirection="down"
				onSwipeComplete={() => {
					setShowChaptersModal(false);
				}}
			>
				<ModalChaptersContent
					chapters={book.chapters}
					currentChapter={chapter}
					onChangeChapter={async (id) => {
						await TrackPlayer.skip(id);
						if (playerState != TrackPlayer.STATE_PLAYING) {
							TrackPlayer.play();
						}
					}}
				/>
			</Modal>
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
