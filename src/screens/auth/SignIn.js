import React from "react";
import { View, ActivityIndicator, Platform, StyleSheet } from "react-native";
import { Button, TextInput, Divider, Text } from "react-native-paper";
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

		console.log(appleCredential);

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
		<>
			<View
				style={{
					width: "100%",
				}}
			>
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: 40,
							fontWeight: "bold",
							margin: 50,
							marginTop: 70,
						}}
					>
						Login
					</Text>

					<View style={{ width: "90%" }}>
						<Controller
							control={control}
							render={({ onChange, onBlur, value }) => (
								<TextInput
									label="Email"
									mode="outlined"
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
									keyboardType="email-address"
									style={{ marginVertical: 10 }}
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
									mode="outlined"
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

						<Button
							mode="contained"
							onPress={handleSubmit(onSubmit)}
							style={{ marginTop: 20 }}
						>
							Sign In
						</Button>
						<View
							style={{
								marginTop: 15,
								width: "100%",
								alignItems: "flex-end",
							}}
						>
							<Button
								onPress={() => navigation.navigate("Sign Up")}
							>
								Register
							</Button>
						</View>

						<Button
							icon="facebook"
							mode="contained"
							style={{ marginTop: 10 }}
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
											console.log(
												"Apple sign-in complete!"
											)
										)
									}
								/>
							</View>
						)}
					</View>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default SignIn;
