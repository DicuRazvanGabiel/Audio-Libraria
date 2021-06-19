import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import {
	useTheme,
	FAB,
	TextInput,
	Button,
	Title,
	Subheading,
	IconButton,
	Colors,
	Divider,
} from "react-native-paper";
import TrackPlayer from "react-native-track-player";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingState from "./LoadingState";
import { convertMinutesHours } from "../Utils";

const BookMarkItem = ({
	bookmark,
	deleteBookmark,
	bookmarkID,
	playBookmark,
}) => {
	return (
		<TouchableOpacity
			style={{ marginBottom: 10 }}
			onPress={() =>
				playBookmark(bookmark.chapter, bookmark.positionSeconds)
			}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<Title>{bookmark.bookmarkName}</Title>
				<IconButton
					icon="delete"
					color={Colors.red500}
					size={20}
					onPress={() => deleteBookmark(bookmarkID)}
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Subheading>{bookmark.chapter}</Subheading>
				<Subheading>
					{convertMinutesHours(Math.round(bookmark.positionSeconds))}
				</Subheading>
			</View>
			<Divider />
		</TouchableOpacity>
	);
};

export default function ModalBookmarksContent({ bookTitle, bookID, chapter }) {
	const userID = auth().currentUser.uid;
	const [bookmarksSnap, loading, error] = useCollection(
		firestore()
			.collection("users")
			.doc(userID)
			.collection("bookmarks")
			.where("bookID", "==", bookID)
	);

	const [addBookmarkView, setAddBookmarkView] = useState(false);
	const [bookmarkName, setBookmarkName] = useState("");

	const addBookMark = async () => {
		setAddBookmarkView(false);
		if (bookmarkName === "") return;
		const positionSeconds = await TrackPlayer.getPosition();

		firestore()
			.collection("users")
			.doc(userID)
			.collection("bookmarks")
			.add({
				bookID,
				bookTitle,
				chapter,
				positionSeconds,
				bookmarkName,
			});
	};

	const deleteBookmark = async (bookmarkID) => {
		firestore()
			.collection("users")
			.doc(userID)
			.collection("bookmarks")
			.doc(bookmarkID)
			.delete();
	};

	const playBookmark = async (lastSavedChapter, lastPosition) => {
		await TrackPlayer.skip(lastSavedChapter);
		await TrackPlayer.seekTo(lastPosition);
	};

	if (loading) return <LoadingState />;

	console.log(bookmarksSnap.size);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
			}}
		>
			{addBookmarkView ? (
				<View style={{ width: "100%" }}>
					<TextInput
						mode={"outlined"}
						label="Nume bookmark"
						value={bookmarkName}
						onChangeText={(text) => setBookmarkName(text)}
						onSubmitEditing={addBookMark}
					/>
					<Button
						icon="content-save-outline"
						mode="text"
						style={{ marginTop: 15 }}
						onPress={addBookMark}
					>
						Salveaza
					</Button>
				</View>
			) : (
				<>
					<View style={{ flex: 1 }}>
						{bookmarksSnap.size > 0 ? (
							<ScrollView>
								{bookmarksSnap.docs.map((doc) => (
									<BookMarkItem
										key={doc.id}
										bookmark={doc.data()}
										deleteBookmark={deleteBookmark}
										bookmarkID={doc.id}
										playBookmark={playBookmark}
									/>
								))}
							</ScrollView>
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Title>Nu ai nici un bookmark salvat</Title>
							</View>
						)}
					</View>
					<FAB
						small
						icon="plus"
						label={"Adauga Bookmark"}
						onPress={() => setAddBookmarkView(true)}
					/>
				</>
			)}
		</View>
	);
}
