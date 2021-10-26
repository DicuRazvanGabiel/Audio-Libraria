import React from "react";
import {
	View,
	ActivityIndicator,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Alert
} from "react-native";
import {
	Button,
	TextInput,
	Divider,
	Text,
	IconButton,
} from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken, LoginButton } from "react-native-fbsdk";
import {
	AppleButton,
	appleAuth,
} from "@invertase/react-native-apple-authentication";
import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

function SignIn({ navigation }) {
	const { control, handleSubmit, errors } = useForm();

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth());

	const onSubmit = (data) => {
		signInWithEmailAndPassword(data.email, data.password);
		if (error) {
			if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password")
			Alert.alert("Conectare", "Adresa de email sau parola sunt gresite", [
				{
					text: "OK",
					onPress: () => {},
				},
			]);
		}
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

		// Sign-in the user with the credential
		return auth().signInWithCredential(facebookCredential);
	}
	async function onGoogleButtonPress() {
		GoogleSignin.configure({
			webClientId:
				"652266832455-8cn50f5pf534odu3er4ll1uq89rdnpfn.apps.googleusercontent.com",
		});
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	}

	if (loading) {
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<ActivityIndicator />
		</View>;
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
							Conectare
						</Button>
						<View
							style={{
								marginVertical: 15,
								width: "100%",
								alignItems: "space-between",
								flexDirection: "row",
							}}
						>
							<View style={{ width: "50%" }}>
								<Button
									onPress={() =>
										navigation.navigate("Resetare parola")
									}
								>
									Ai uitat parola?
								</Button>
							</View>
							<View style={{ width: "50%" }}>
								<Button
									onPress={() =>
										navigation.navigate("Creare cont")
									}
								>
									Creare cont
								</Button>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-evenly",
								alignItems: "center",
							}}
						>
							<TouchableOpacity onPress={onFacebookButtonPress}>
								<Entypo
									name="facebook"
									size={37}
									color="#4267B2"
									style={{
										backgroundColor: "#fff",
									}}
								/>
							</TouchableOpacity>
							<GoogleSigninButton
								size={GoogleSigninButton.Size.Icon}
								color={GoogleSigninButton.Color.Dark}
								onPress={onGoogleButtonPress}
								style={{ borderRadius: 20 }}
							/>
						</View>

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

export default SignIn;
