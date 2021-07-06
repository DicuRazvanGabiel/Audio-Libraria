import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Divider, Surface, useTheme } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

export default function RatingStars({
	count = 0,
	readOnly = true,
	size = 24,
	onStarPress,
}) {
	const NUMBER_STARS = 5;
	const TouchableComponent = readOnly ? View : TouchableOpacity;
	let toReturn = [];
	for (let index = 0; index < NUMBER_STARS; index++) {
		if (index < count) {
			toReturn.push(
				<TouchableComponent
					key={index}
					onPress={() => onStarPress(index + 1)}
				>
					<Entypo name="star" size={size} color="gold" key={index} />
				</TouchableComponent>
			);
		} else {
			toReturn.push(
				<TouchableComponent
					key={index}
					onPress={() => onStarPress(index + 1)}
				>
					<Entypo
						name="star-outlined"
						size={size}
						color="gold"
						key={index}
					/>
				</TouchableComponent>
			);
		}
	}

	return (
		<View
			style={{
				flexDirection: "row",
				alignItemsd: "center",
			}}
		>
			{toReturn.map((star) => star)}
		</View>
	);
}
