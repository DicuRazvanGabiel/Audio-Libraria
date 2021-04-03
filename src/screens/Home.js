import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { List, Divider, Avatar } from "react-native-paper";
import LoadingState from "../components/LoadingState";

// import { LoginManager, AccessToken } from "react-native-fbsdk";
import firestore from "@react-native-firebase/firestore";

export default function Home({ navigation }) {
	const [data, setData] = useState(null);

	const fetchBooksData = async () => {
		const booksSnap = await firestore().collection("books").get();
		const books = [];
		booksSnap.forEach((book) =>
			books.push({ id: book.id, ...book.data() })
		);
		setData(books);
	};

	useEffect(() => {
		fetchBooksData();
	}, [firestore]);

	const renderBook = (book) => {
		return (
			<TouchableOpacity
				key={book.id}
				onPress={() => {
					navigation.push("Player", { book });
				}}
			>
				<List.Item
					title={book.title}
					description={book.subtitle}
					left={(props) => (
						<Avatar.Image
							size={60}
							source={{ url: book.image.src }}
						/>
					)}
				/>
				<Divider />
			</TouchableOpacity>
		);
	};

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
	if (!data) {
		return <LoadingState />;
	}
	return <ScrollView>{data.map((book) => renderBook(book))}</ScrollView>;
}
