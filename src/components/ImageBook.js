import React from "react";
import { Image } from "react-native";

export default function ImageBook({ imageUrl, height = 200, width = 140 }) {
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
