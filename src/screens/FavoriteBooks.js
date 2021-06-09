import React, { useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Divider, useTheme } from "react-native-paper";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const db = firestore();

export default function FavoriteBooks({ onUpdate }) {
	const [isLoading, setIsLoading] = useState(true);
	const [favoriteBooks, setFavoriteBooks] = useState([]);
	const userID = auth().currentUser.uid;

	useFocusEffect(() => {
		setUp();
	});

	const setUp = async () => {
		const favBooksSnap = await db
			.collection("users")
			.doc(userID)
			.collection("favorite")
			.get();
		// let books to fetch
		favBooksSnap.forEach((book) => {});

		if (favBooksSnap.size > 0) {
			setIsLoading(false);
		}
	};

	if (isLoading) return <LoadingState />;

	return (
		<View>
			<Text>Favorite</Text>
		</View>
	);
}
