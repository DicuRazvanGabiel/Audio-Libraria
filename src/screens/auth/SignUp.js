import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Button, TextInput, Text, IconButton } from "react-native-paper";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm, Controller } from "react-hook-form";
import auth from "@react-native-firebase/auth";

function SignUn() {
	const { control, handleSubmit, errors } = useForm();
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth());

	const onSubmit = (data) => {
		console.log(data.email, data.password);
		createUserWithEmailAndPassword(data.email, data.password);
	};

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
			<View style={{ width: "90%" }}>
				<Controller
					control={control}
					render={({ onChange, onBlur, value }) => (
						<TextInput
							label="Email"
							onBlur={onBlur}
							mode="outlined"
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
							label="Parola"
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

				<Controller
					control={control}
					render={({ onChange, onBlur, value }) => (
						<TextInput
							label="Repeta parola"
							onBlur={onBlur}
							mode="outlined"
							onChangeText={(value) => onChange(value)}
							value={value}
							secureTextEntry={true}
						/>
					)}
					name="repassword"
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
					Creare cont
				</Button>
			</View>
		</View>
	);
}

export default SignUn;
