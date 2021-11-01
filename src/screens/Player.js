import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import TrackPlayer, {
	useTrackPlayerEvents,
	Event,
	State,
} from "react-native-track-player";
import {
	IconButton,
	Colors,
	Text,
	Modal,
	Portal,
	useTheme,
} from "react-native-paper";
import PlayerSlider from "./../components/PlayerSlider";
import { Entypo } from "@expo/vector-icons";
import ModalChaptersContent from "../components/ModalChaptersContent";
import ModalBookmarksContent from "../components/ModalBookmarksContent";
import BackgroundTimer from "react-native-background-timer";

import { saveUserLastPlay, saveBookProgress } from "../Utils";
import { PlayerContext } from "../Context/PlayerContext";

const db = firestore();

export default function Player({ route }) {
	const [loading, setLoading] = useState(true);
	const [playerState, setPlayerState] = useState("play");
	const [chapter, setChapter] = useState();
	const [showChaptersModal, setShowChaptersModal] = useState(false);
	const [showBookmarksModal, setShowBookmarksModal] = useState(false);
	const { player, setPlayer } = useContext(PlayerContext);
	const firstInit = route.params ? route.params.firstInit : false;
	const bookInfo = player.bookInfo;
	const theme = useTheme();

	const setUp = async () => {
		if (!firstInit) {
			const trackID = await TrackPlayer.getCurrentTrack();
			const currentTrack = await TrackPlayer.getTrack(trackID);
			setChapter(currentTrack.title);
			setLoading(false);
		} else {
			await TrackPlayer.setupPlayer({});
			
			if (state === State.Playing) {
				await TrackPlayer.stop();
				await TrackPlayer.destroy();
			}
			const bookSnap = await db
				.collection("books")
				.doc(bookInfo.id)
				.get();
			const book = bookSnap.data();
			await TrackPlayer.setupPlayer();

			let trackArray = [];
			book.chapters.map((c) => {
				trackArray.push({
					id: c.name,
					url: c.file.src,
					title: c.name,
					album: bookInfo.title,
					artist: bookInfo.author,
					duration: c.duration,
					artwork: bookInfo.imageSrc,
				});
			});
			await TrackPlayer.add(trackArray);

			const savedBook = await db
				.collection("users")
				.doc(auth().currentUser.uid)
				.collection("savedBooksPosition")
				.doc(bookInfo.id)
				.get();

			let playingChapter = "";
			//check last position for the current book on current user
			if (savedBook.exists) {
				const lastSavedChapter = savedBook.data().chapter;
				const lastPosition = savedBook.data().positionSeconds;
				await TrackPlayer.skip(lastSavedChapter);
				await TrackPlayer.seekTo(lastPosition);
				const chapterTitle = await TrackPlayer.getTrack(
					lastSavedChapter
				);
				setChapter(chapterTitle.title);
				playingChapter = chapterTitle.title;
			} else {
				setChapter(trackArray[0].title);
				playingChapter = trackArray[0].title;
			}

			//set the curent playing chapter
			setPlayer({
				...player,
				chapter: playingChapter,
			});
			TrackPlayer.play();
		}
		const state = await TrackPlayer.getState();
		setPlayerState(state);
		BackgroundTimer.stopBackgroundTimer();
		//start backgrount timer for logging to db the last position
		BackgroundTimer.runBackgroundTimer(async () => {
			const state = await TrackPlayer.getState();
			if (state === State.Playing) {
				const positionSeconds = await TrackPlayer.getPosition();
				const track = await TrackPlayer.getCurrentTrack();
				await saveUserLastPlay(
					auth().currentUser.uid,
					bookInfo.id,
					track,
					positionSeconds,
					db
				);
				await saveBookProgress(bookInfo.id);
			}
		}, 60000);
		setLoading(false);
	};

	useTrackPlayerEvents(
		[Event.PlaybackState, Event.PlaybackTrackChanged],
		async (event) => {
			if (event.type === Event.PlaybackTrackChanged) {
				const track = await TrackPlayer.getTrack(event.nextTrack);
				setChapter(track.title);
				setPlayer({ ...player, chapter: track.title });
			}
			if (event.type === Event.PlaybackState) {
				setPlayerState(event.state);
			}

			const state = await TrackPlayer.getState();
			setPlayerState(state);
		}
	);

	useEffect(() => {
		setUp();
	}, [player.bookInfo.id]);

	const handlePlayPauseButton = async () => {
		if (playerState === State.Playing) {
			TrackPlayer.pause();
		}

		if (playerState === State.Paused) {
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
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<TouchableOpacity
					style={{ marginLeft: 20 }}
					onPress={() => {
						setShowBookmarksModal(true);
					}}
				>
					<Entypo name="bookmark" size={24} color="red" />
				</TouchableOpacity>
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
					uri: bookInfo.imageSrc,
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
						{bookInfo.title}
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
						playerState === State.Playing
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

			<Portal>
				<Modal
					visible={showChaptersModal}
					onDismiss={() => {
						setShowChaptersModal(false);
					}}
					contentContainerStyle={{
						backgroundColor: theme.colors.surface,
						height: "70%",
						margin: 10,
						marginBottom: 20,
						borderRadius: 20,
						padding: 20,
					}}
				>
					<ModalChaptersContent
						chapters={bookInfo.chapters}
						currentChapter={chapter}
						onChangeChapter={async (id) => {
							await TrackPlayer.skip(id);
							if (playerState != State.Playing) {
								TrackPlayer.play();
							}
						}}
					/>
				</Modal>

				<Modal
					visible={showBookmarksModal}
					onDismiss={() => {
						setShowBookmarksModal(false);
					}}
					contentContainerStyle={{
						backgroundColor: theme.colors.surface,
						height: "70%",
						margin: 10,
						marginBottom: 20,
						borderRadius: 20,
						padding: 20,
					}}
				>
					<ModalBookmarksContent
						bookTitle={bookInfo.title}
						bookID={bookInfo.id}
						chapter={chapter}
					/>
				</Modal>
			</Portal>
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
