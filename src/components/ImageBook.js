import React from "react";
import { Image } from "react-native";

export default function ImageBook({ imageUrl }) {
	return (
		<Image
			style={{
				height: 200,
				width: 150,
				borderRadius: 15,
				marginBottom: 5,
				resizeMode: "stretch",
			}}
			source={{
				uri: imageUrl,
			}}
		/>
	);
}
