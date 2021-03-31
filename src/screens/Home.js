import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export default function Home({ navigation }) {
	async function onFacebookButtonPress() {
		// Attempt login with permissions
		const result = await LoginManager.logInWithPermissions([
			"public_profile",
			"email",
		]);

		if (result.isCancelled) {
			throw "User cancelled the login process";
		}

		// Once signed in, get the users AccesToken
		const data = await AccessToken.getCurrentAccessToken();

		if (!data) {
			throw "Something went wrong obtaining access token";
		}

		console.log(data);

		// Create a Firebase credential with the AccessToken
		// const facebookCredential = auth.FacebookAuthProvider.credential(
		// 	data.accessToken
		// );

		// // Sign-in the user with the credential
		// return auth().signInWithCredential(facebookCredential);
	}
	return (
		<View>
			<Text>Home Screen</Text>
			<Button
				mode="contained"
				onPress={() => navigation.push("Settings")}
			>
				Settings
			</Button>
			<Button onPress={onFacebookButtonPress}>Facebook</Button>
		</View>
	);
}
