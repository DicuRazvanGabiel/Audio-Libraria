import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";

const CategorieItemShow = ({ category, setCategoryID, categoryID }) => {
	if (!category) return null;
	return (
		<TouchableOpacity
			style={{ marginRight: 10, ...styles.selected }}
			onPress={() => {
				setCategoryID(category.id);
			}}
		>
			<Title key={category.id}>{category.name}</Title>
			{categoryID === category.id && (
				<View
					style={{
						backgroundColor: "#FE6D8E",
						width: "100%",
						height: 7,
						borderRadius: 10,
					}}
				></View>
			)}
		</TouchableOpacity>
	);
};

export default function CategoryStrip({
	categories,
	setCategoryID,
	categoryID,
}) {
	return (
		<View style={{ marginHorizontal: 10, marginVertical: 10 }}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<CategorieItemShow />
				{categories.map((cat) => (
					<CategorieItemShow
						key={cat.id}
						category={cat}
						categoryID={categoryID}
						setCategoryID={setCategoryID}
					/>
				))}
			</ScrollView>
		</View>
	);
}
