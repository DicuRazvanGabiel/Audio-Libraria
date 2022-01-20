import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Button, TextInput, Text, IconButton } from "react-native-paper";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm, Controller } from "react-hook-form";
import auth from "@react-native-firebase/auth";

function SignUn() {
	const { control, handleSubmit, errors, setError } = useForm();
	const [createUserWithEmailAndPassword, loading, error] =
		useCreateUserWithEmailAndPassword(auth());

	const onSubmit = (data) => {
		if(data.password.lenght < 6){
			setError("repassword", {
				type: "manual",
				message: "Parola trebuie sa contina cel putin 6 caractere"
			});
			return;
		}

		if(data.password !== data.repassword){
			setError("repassword", {
				type: "manual",
				message: "Cele doua parole sunt diferite"
			});
			return;
		}
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
							style={styles.input}
							keyboardType="email-address"
						/>
					)}
					name="email"
					rules={{
						required: true,
						pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
					}}
					defaultValue=""
				/>
				{errors.email && <Text style={styles.errorText}>Introduceti un email valid.</Text>}
				<Controller
					control={control}
					render={({ onChange, onBlur, value }) => (
						<TextInput
							label="Parola"
							mode="outlined"
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
							style={styles.input}
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
				{errors.password && <Text style={styles.errorText}>Parola este obligatorie si trebuie sa contina minim 6 caractere.</Text>}

				<Controller
					control={control}
					render={({ onChange, onBlur, value }) => (
						<TextInput
							label="Repeta parola"
							onBlur={onBlur}
							mode="outlined"
							onChangeText={(value) => onChange(value)}
							value={value}
							style={styles.input}
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
				{errors.repassword && <Text style={styles.errorText}>{errors.repassword.message}</Text>}
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

styles = StyleSheet.create({
	errorText: {
		color: 'red',
		marginTop: 2,
		marginBottom: 5
	},
	input: {
		marginBottom: 5
	}
})

export default SignUn;