import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
	IconButton,
	Colors,
	Text,
	useTheme,
	FAB,
	Portal,
	Modal,
	TextInput,
	Button,
} from "react-native-paper";
import TrackPlayer from "react-native-track-player";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingState from "./LoadingState";

export default function ModalBookmarksContent({ bookTitle, bookID, chapter }) {
	const theme = useTheme();
	const userID = auth().currentUser.uid;
	const [bookmarksSnap, loading, error] = useCollection(
		firestore().collection("users").doc(userID).collection("bookmarks")
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

	if (loading) return <LoadingState />;

	console.log(bookmarksSnap.size);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View
				style={{
					backgroundColor: theme.colors.surface,
					height: "70%",
					margin: 10,
					width: "100%",
					marginBottom: 20,
					borderRadius: 20,
					padding: 20,
				}}
			>
				{addBookmarkView ? (
					<View>
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
						<View style={{ flex: 1, backgroundColor: "red" }}>
							<ScrollView>
								{bookmarksSnap.forEach((doc) => (
									<Text>{doc.bookmarkName}</Text>
								))}
							</ScrollView>
						</View>
						<FAB
							small
							icon="plus"
							label={"Adauga Bookmark"}
							style={styles.fab}
							onPress={() => setAddBookmarkView(true)}
						/>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
