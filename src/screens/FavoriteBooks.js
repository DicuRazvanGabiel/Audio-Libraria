import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Title } from "react-native-paper";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import FavoriteBookItem from "../components/FavoriteBookItem";

export default function FavoriteBooks({ navigation }) {
	const userID = auth().currentUser.uid;
	const [snapshotFavorteBooks, loading, error] = useCollection(
		firestore().collection("users").doc(userID).collection("favorite")
	);

	if (loading) return <LoadingState />;

	return (
		<View style={{ flex: 1, marginTop: 10 }}>
			{snapshotFavorteBooks.size > 0 ? (
				<ScrollView>
					{snapshotFavorteBooks.docs.map((book) => (
						<FavoriteBookItem
							key={book.id}
							book={book}
							navigation={navigation}
						/>
					))}
				</ScrollView>
			) : (
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Title>Nu exista carti favorite</Title>
				</View>
			)}
		</View>
	);
}
