import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Divider, Surface, useTheme } from "react-native-paper";
import { useDocument } from "react-firebase-hooks/firestore";
import firestore from "@react-native-firebase/firestore";
import LoadingState from "../components/LoadingState";
import RatingStars from "../components/RatingStars";

import { convertMinutesHours } from "../Utils";

export default function BookListItem({ navigation, bookID, businessBookID }) {
	const theme = useTheme();
	const [book, loading, error] = useDocument(
		firestore().collection("books_info").doc(bookID)
	);
	if (loading) return <LoadingState />;

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
						uri: book.data().imageSrc,
					}}
					style={styles.image}
				/>
				<View
					style={{
						marginLeft: 10,
						marginTop: 10,
						justifyContent: "space-between",
						flex: 1
					}}
				>
					<View style={{flex: 1}}>
						<View style={{flexDirection: 'row'}}>
							<Text
								style={{
									fontSize: 22,
									fontWeight: "bold",
									flex:1,
									flexWrap: 'wrap'
								}}
							>
								{book.data().title}
							</Text>
						</View>
						
						<Text style={{ fontSize: 18 }}>
							{book.data().author}
						</Text>
					</View>
					<Text style={{textAlign: 'right'}}>
						{convertMinutesHours(book.data().totalDurarion)}
					</Text>
					{/* For later development <RatingStars count={book.data().rating} /> */}
				</View>
			</Surface>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	surface: {
		height: 130,
		padding: 10,
		flex: 1,
		elevation: 4,
		marginHorizontal: 10,
		borderRadius: 10,
		flexDirection: "row",
		marginBottom: 10,
		alignItems: 'center'
	},
	image: {
		height: 100,
		width: 100,
		resizeMode: "stretch",
	},
});
