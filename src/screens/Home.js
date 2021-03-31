import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Home({ navigation }) {
	function loginFacebook() {}
	return (
		<View>
			<Text>Home Screen</Text>
			<Button
				mode="contained"
				onPress={() => navigation.push("Settings")}
			>
				Settings
			</Button>
			<Button onPress={loginFacebook}>Facebook</Button>
		</View>
	);
}
