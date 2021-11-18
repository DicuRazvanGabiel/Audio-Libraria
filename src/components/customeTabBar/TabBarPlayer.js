import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import PlayerBar from "./PlayerBar";

export default function TabBarPlayer(props) {
	const theme = useTheme();
	return (
		<View style={{borderTopColor: theme.colors.primary , borderTopWidth: 1, paddingTop: 1}}>
			<PlayerBar navigation={props.navigation} />
			<BottomTabBar {...props} />
		</View>
	);
}
