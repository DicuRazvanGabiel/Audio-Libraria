import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import PlayerBar from "./PlayerBar";

export default function TabBarPlayer(props) {
	return (
		<View>
			<PlayerBar navigation={props.navigation} />
			<BottomTabBar {...props} />
		</View>
	);
}
