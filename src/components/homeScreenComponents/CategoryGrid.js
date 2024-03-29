import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import CategoryItem from "./CategoryItem";

styles = StyleSheet.create({
	constainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},

	categoryContainer: {
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
});

export default function CategoryGrid({ categories, navigation }) {
	return (
		<View>
			<View style={{
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",}}>
				<View style={{
					flexWrap: "wrap",
					flexDirection: "row",
					justifyContent: "space-between",
					flex: 1,
				}}>
					{categories.map((cat) => (
						<CategoryItem
							key={cat.id}
							imageUrl={cat.image.src}
							name={cat.name}
							categoryID={cat.id}
							navigation={navigation}
						/>
					))}
				</View>
			</View>
		</View>
	);
}


