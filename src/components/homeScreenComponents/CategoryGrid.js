import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import CategoryItem from "./CategoryItem";

export default function CategoryGrid({ categories }) {
	console.log(categories);
	return (
		<View>
			<Text style={{ margin: 10, marginLeft: 40 }}>Categorii</Text>
			<View style={styles.constainer}>
				<TouchableOpacity>
					<Entypo name="chevron-left" size={45} color="#6EA8FF" />
				</TouchableOpacity>

				<View style={styles.categoryContainer}>
					{categories.map((cat) => (
						<CategoryItem
							key={cat.id}
							imageUrl={cat.image.src}
							name={cat.name}
						/>
					))}
				</View>

				<TouchableOpacity>
					<Entypo name="chevron-right" size={45} color="#6EA8FF" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

styles = StyleSheet.create({
	constainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	categoryContainer: {
		flexWrap: "wrap",
		flexDirection: "row",
		flex: 1,
	},
});
