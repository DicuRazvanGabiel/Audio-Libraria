import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Divider, Surface, useTheme } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { useDocument } from "react-firebase-hooks/firestore";
import firestore from "@react-native-firebase/firestore";
import LoadingState from "../components/LoadingState";

import { convertMinutesHours } from "../Utils";

export default function BookListItem({
	navigation,
	bookID,
	author,
	businessBookID,
}) {
	const theme = useTheme();
	const [book, loading, error] = useDocument(
		firestore().collection("books").doc(bookID)
	);
	if (loading) return <LoadingState />;

	console.log({ bookID, author, businessBookID });

	const calculateTotalDuration = () => {
		let totalDurarion = 0;
		book.data().chapters.map((c) => {
			totalDurarion += c.duration;
		});

		return convertMinutesHours(totalDurarion);
	};

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.push("BookDetails", {
					businessBookID: businessBookID,
					bookID: bookID,
				})
			}
		>
			<Surface style={styles.surface}>
				<Image
					source={{
						uri: book.data().image.src,
					}}
					style={styles.image}
				/>
				<View
					style={{
						marginLeft: 10,
						marginTop: 10,
						justifyContent: "space-between",
						width: "80%",
					}}
				>
					<View>
						<Text
							style={{
								fontSize: 22,
								fontWeight: "bold",
							}}
						>
							{book.data().title}
						</Text>
						<Text style={{ fontSize: 18 }}>{author}</Text>
					</View>

					<Text>{calculateTotalDuration()}</Text>

					<Rating
						type="custom"
						imageSize={20}
						tintColor={theme.colors.background}
						isDisabled={true}
					/>
				</View>
			</Surface>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	surface: {
		height: 150,
		padding: 10,
		flex: 1,
		elevation: 4,
		marginHorizontal: 10,
		borderRadius: 10,
		flexDirection: "row",
		marginBottom: 10,
	},
	image: {
		height: 130,
		width: 90,
		resizeMode: "stretch",
	},
});
