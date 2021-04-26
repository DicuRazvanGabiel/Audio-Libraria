import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ImageBook from "../ImageBook";

export default function BookItem({ navigation }) {
	return (
		<TouchableOpacity
			style={{ width: 150, margin: 10 }}
			onPress={() => navigation.push("BookDetails")}
		>
			<ImageBook
				imageUrl={
					"https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/normal/tata-bogat-tata-sarac_2702_1_1596556923.jpg"
				}
			/>
			<Text style={{ textAlign: "center" }}>Tata bogat tata sarac</Text>
			<Text style={{ textAlign: "center" }}>Robert Kiyosaki</Text>
		</TouchableOpacity>
	);
}
