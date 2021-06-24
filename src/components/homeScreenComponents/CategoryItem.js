import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function CategoryItem({
	imageUrl,
	name,
	navigation,
	categoryID,
}) {
	return (
		<TouchableOpacity
			style={{
				width: 70,
				margin: 5,
				alignSelf: "flex-start",
			}}
			onPress={() => {
				navigation.navigate("Categorii", {
					categoryPressID: categoryID,
				});
			}}
		>
			<Image
				style={{ height: 70, width: 70, borderRadius: 35 }}
				source={{
					uri: imageUrl,
				}}
			/>

			<View>
				<Text style={{ textAlign: "center" }}>{name}</Text>
			</View>
		</TouchableOpacity>
	);
}
