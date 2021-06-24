import React from "react";
import { View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";
import {
	Button,
	TextInput,
	Divider,
	Text,
	IconButton,
} from "react-native-paper";

export default function ResetPassword({ navigation }) {
	const { control, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		auth().sendPasswordResetEmail(data.email);
		Alert.alert(
			"Verificati emailul",
			"Pentru a putea reseta parola, accesati link-ul din email",
			[
				{
					text: "OK",
					onPress: () => navigation.pop(),
				},
			]
		);
	};
	return (
		<View style={{ alignItems: "center" }}>
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
				<Button mode="contained" onPress={handleSubmit(onSubmit)}>
					Resetare parola
				</Button>
			</View>
		</View>
	);
}
