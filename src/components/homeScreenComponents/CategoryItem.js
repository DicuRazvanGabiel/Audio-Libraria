import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function CategoryItem() {
	return (
		<TouchableOpacity
			style={{
				width: 70,
				margin: 5,
				alignSelf: "flex-start",
			}}
		>
			<Image
				style={{ height: 70, width: 70, borderRadius: 35 }}
				source={{
					uri:
						"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
				}}
			/>

			<View>
				<Text style={{ textAlign: "center" }}>
					Dezvoltare personala
				</Text>
			</View>
		</TouchableOpacity>
	);
}
