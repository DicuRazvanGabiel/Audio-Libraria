import React, { useContext } from "react";
import { View, ScrollView, FlatList } from "react-native";
import { UserContext } from "../Context/UserContext";
import { Text, Divider, useTheme } from "react-native-paper";
import BookListItem from "../components/BookListItem";
import firestore from "@react-native-firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingState from "../components/LoadingState";

export default function BusinessAccount({ navigation }) {
	const { businessID } = useContext(UserContext);
	const [businessBooks, loading, error] = useCollection(
		firestore()
			.collection("businesses")
			.doc(businessID)
			.collection("businessBooks")
	);

	if (loading) return <LoadingState />;

	return (
		<ScrollView>
			{businessBooks.docs.map((book) => (
				<BookListItem
					navigation={navigation}
					bookID={book.data().books}
					businessBookID={book.id}
					author={book.data().author}
					key={book.id}
				/>
			))}
		</ScrollView>
	);
}
