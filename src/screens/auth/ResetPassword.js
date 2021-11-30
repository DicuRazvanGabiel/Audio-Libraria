import React from "react";
import { View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";
import {
	Button,
	TextInput,
	Text,
} from "react-native-paper";

export default function ResetPassword({ navigation }) {
	const { control, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		auth().sendPasswordResetEmail(data.email);
		console.log(data.email)
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
							style={{ marginTop: 10 }}
						/>
					)}
					name="email"
					rules={{
						required: true,
						pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
					}}
					defaultValue=""
				/>
				{errors.email && <Text style={{color: 'red',marginTop: 2, marginBottom: 5}}>Introduceti un email valid.</Text>}
				<Button mode="contained" onPress={handleSubmit(onSubmit)}>
					Resetare parola
				</Button>
			</View>
		</View>
	);
}
