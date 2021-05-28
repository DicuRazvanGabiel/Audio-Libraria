import React from "react";
import { View, Image } from "react-native";
import {
	Text,
	Divider,
	useTheme,
	IconButton,
	Colors,
} from "react-native-paper";

export default function PlayerBarTabBar() {
	return (
		<View
			style={{
				padding: 10,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<View style={{ flexDirection: "row" }}>
				<Image
					source={{
						uri: "https://cdn.dc5.ro/img-prod/91226733-0-240.jpeg",
					}}
					style={{
						height: 50,
						width: 50,

						resizeMode: "contain",
					}}
				/>
				<View>
					<Text>Cum sa iti faci prieteni</Text>
					<Text>Dale carnegie</Text>
				</View>
			</View>
			<IconButton
				icon="play"
				color={Colors.red500}
				size={30}
				onPress={() => console.log("Pressed")}
			/>
		</View>
	);
}
