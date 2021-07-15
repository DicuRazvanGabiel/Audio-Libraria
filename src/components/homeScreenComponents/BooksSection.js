import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import BookItem from "./BookItem";

export default function BooksSection({ navigation, title, books }) {
	debugger;
	return (
		<View style={styles.container}>
			<Text
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontSize: 20,
				}}
			>
				{title}
			</Text>
			<ScrollView horizontal={true}>
				{books.map((book) => (
					<BookItem
						key={book.id}
						navigation={navigation}
						book={book}
					/>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: " 100%",
		marginTop: 10,
	},
});
