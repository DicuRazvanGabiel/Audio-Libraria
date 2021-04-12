import React from "react";
import { View, ActivityIndicator, Text, Platform } from "react-native";
import { Button, TextInput, Divider } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import {
	AppleButton,
	appleAuth,
} from "@invertase/react-native-apple-authentication";

function SignIn({ navigation }) {
	const { control, handleSubmit, errors } = useForm();

	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth());

	const onSubmit = (data) => {
		signInWithEmailAndPassword(data.email, data.password);
	};

	async function onAppleButtonPress() {
		// Start the sign-in request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});

		// Ensure Apple returned a user identityToken
		if (!appleAuthRequestResponse.identityToken) {
			throw "Apple Sign-In failed - no identify token returned";
		}

		// Create a Firebase credential from the response
		const { identityToken, nonce } = appleAuthRequestResponse;
		const appleCredential = auth.AppleAuthProvider.credential(
			identityToken,
			nonce
		);

		// Sign the user in with the credential
		return auth().signInWithCredential(appleCredential);
	}

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

		// Create a Firebase credential with the AccessToken
		const facebookCredential = auth.FacebookAuthProvider.credential(
			data.accessToken
		);

		console.log(facebookCredential);

		// Sign-in the user with the credential
		return auth().signInWithCredential(facebookCredential);
	}

	if (loading) {
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<ActivityIndicator />
		</View>;
	}

	if (error) {
		console.error(error);
	}

	return (
		<View>
			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<TextInput
						label="Email"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						keyboardType="email-address"
					/>
				)}
				name="email"
				rules={{
					required: true,
				}}
				defaultValue=""
			/>
			{errors.email && <Text>This is required.</Text>}

			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<TextInput
						label="Password"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						secureTextEntry={true}
					/>
				)}
				name="password"
				rules={{
					required: true,
					minLength: 6,
				}}
				defaultValue=""
			/>
			{errors.password && <Text>This is required.</Text>}

			<View style={{ margin: 15 }}>
				<Button mode="contained" onPress={handleSubmit(onSubmit)}>
					Sign In
				</Button>
				<View
					style={{
						marginTop: 15,
						width: "100%",
						alignItems: "flex-end",
					}}
				>
					<Button onPress={() => navigation.navigate("Sign Up")}>
						Register
					</Button>
				</View>
				<View style={{ width: "100%" }}>
					<Divider />
				</View>

				<Button
					icon="facebook"
					mode="contained"
					onPress={() => onFacebookButtonPress()}
				>
					Facebook log in
				</Button>
				{Platform.OS === "ios" && (
					<View style={{ marginTop: 20 }}>
						<AppleButton
							buttonStyle={AppleButton.Style.WHITE}
							buttonType={AppleButton.Type.SIGN_IN}
							style={{
								width: "100%",
								height: 40,
							}}
							onPress={() =>
								onAppleButtonPress().then(() =>
									console.log("Apple sign-in complete!")
								)
							}
						/>
					</View>
				)}
			</View>
		</View>
	);
}

export default SignIn;
