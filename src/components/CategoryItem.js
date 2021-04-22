import React from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";

export default function CategoryItem() {
	return (
		<View style={{ width: 70, margin: 5 }}>
			<Image
				style={{ height: 70, width: 70, borderRadius: 35 }}
				source={{
					uri:
						"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
				}}
			/>
			<Text style={{ textAlign: "center" }}>Dezvoltare personala</Text>
		</View>
	);
}
