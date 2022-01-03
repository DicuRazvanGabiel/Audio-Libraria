import React from "react";
import { Image } from "react-native";

export default function ImageBook({ imageUrl, height = 150, width = 150 }) {
	return (
		<Image
			style={{
				height,
				width,
				borderRadius: 15,
				marginBottom: 5,
				resizeMode: "cover",
			}}
			source={{
				uri: imageUrl,
			}}
		/>
	);
}
