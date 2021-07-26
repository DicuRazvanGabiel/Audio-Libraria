import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ImageBook from "../ImageBook";

export default function BookItem({ navigation, book }) {
	return (
		<TouchableOpacity
			style={{ width: 150, margin: 10 }}
			onPress={() => navigation.push("BookDetails", { bookID: book.id })}
		>
			<ImageBook imageUrl={book.imageSrc} />
			<Text style={{ textAlign: "center", fontWeight: "bold" }}>
				{book.title}
			</Text>
			<Text style={{ textAlign: "center" }}>{book.author}</Text>
		</TouchableOpacity>
	);
}
