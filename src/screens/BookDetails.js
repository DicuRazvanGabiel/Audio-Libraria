import React, { useEffect, useState, useContext } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import {
	Text,
	Divider,
	useTheme,
	IconButton,
	Colors,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import HTML from "react-native-render-html";
import { Rating } from "react-native-ratings";
import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";
import TrackPlayer from "react-native-track-player";

import { UserContext } from "../Context/UserContext";
import { PlayerContext } from "../Context/PlayerContext";
import { isCurrentBorrowBook } from "../Utils";

import ImageBook from "../components/ImageBook";
import LoadingState from "../components/LoadingState";

const db = firestore();

export default function BookDetails({ navigation, route }) {
	const { employee } = useContext(UserContext);
	const theme = useTheme();
	const { bookID, businessBookID } = route.params;
	const [loading, setLoading] = useState(true);
	const [bookInfo, setBookInfo] = useState(null);
	const [borrowedBook, setBorrowedBook] = useState(null);
	const { player, setPlayer } = useContext(PlayerContext);

	const fetchBookInfo = async () => {
		let book = {};
		const bookSnap = await db.collection("books").doc(bookID).get();

		const authorSnap = await db
			.collection("authors")
			.doc(bookSnap.data().authors)
			.get();

		const narratorSnap = await db
			.collection("narrator")
			.doc(bookSnap.data().narrator)
			.get();

		const publisherSnap = await db
			.collection("publishing")
			.doc(bookSnap.data().publishing)
			.get();

		const categoriesSnap = await db.collection("categories").get();
		book = {
			id: bookSnap.id,
			...bookSnap.data(),
			authors: authorSnap.data(),
			narrator: narratorSnap.data(),
			publishing: publisherSnap.data(),
		};
		let categories = [];
		categoriesSnap.forEach((cat) => {
			if (book.categories.includes(cat.id)) {
				categories.push({ ...cat.data() });
			}
		});
		book.categories = categories;
		setBookInfo(book);
		setBorrowedBook(
			await isCurrentBorrowBook(employee, businessBookID, db)
		);
	};

	useEffect(() => {
		fetchBookInfo();
	}, [route.params]);

	const borrowBook = async () => {
		functions()
			.httpsCallable("barrowBook")({
				businessBookID: businessBookID,
				businessID: employee.businessID,
				employeeID: employee.employeeID,
			})
			.then(async (response) => {
				if (response.data.ok) {
					setBorrowedBook(true);
					const state = await TrackPlayer.getState();
					if (state === TrackPlayer.STATE_PLAYING) {
						TrackPlayer.stop();
						TrackPlayer.destroy();
						setPlayer(null);
					}
					return;
				}
				Alert.alert("Imprumutarea cartii", response.data.error, [
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				]);
			});
	};

	const unBarrow = async () => {
		functions()
			.httpsCallable("unBarrow")({
				businessBookID: businessBookID,
				businessID: employee.businessID,
				employeeID: employee.employeeID,
			})
			.then(async (response) => {
				setBorrowedBook(false);
				const state = await TrackPlayer.getState();
				if (state === TrackPlayer.STATE_PLAYING) {
					TrackPlayer.stop();
					TrackPlayer.destroy();
					setPlayer(null);
				}
			});
	};

	if (!bookInfo) return <LoadingState />;

	return (
		<ScrollView style={styles.container}>
			<View style={styles.bookImageContainer}>
				<ImageBook imageUrl={bookInfo.image.src} />
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						margin: 10,
					}}
				>
					<Text style={{ fontSize: 30, marginBottom: 5 }}>
						{bookInfo.title}
					</Text>
					<Divider />
					<Text style={{ fontSize: 20 }}>
						{bookInfo.authors.name}
					</Text>
					{borrowedBook && (
						<IconButton
							icon={"play-circle-outline"}
							color={Colors.red500}
							size={40}
							onPress={() => {
								navigation.navigate("Player", {
									book: bookInfo,
								});
							}}
						/>
					)}
				</View>
				<View>
					<Ionicons name={"star-outline"} size={28} color={"#fff"} />
				</View>
			</View>
			<View style={styles.demoPlayerContainer}>
				<Text style={{ color: "#000", marginLeft: 15 }}>
					Asculta demo...
				</Text>
				<View style={{ right: -5 }}>
					<AntDesign name="play" size={26} color="#8743FF" />
				</View>
			</View>
			<View style={{ marginTop: 20 }}>
				{borrowedBook ? (
					<TouchableOpacity
						style={{
							backgroundColor: "#FE805C",
							borderRadius: 30,
							padding: 8,
							width: 200,
						}}
						onPress={unBarrow}
					>
						<Text style={{ fontSize: 23, textAlign: "center" }}>
							Preda
						</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={{
							backgroundColor: "#FE805C",
							borderRadius: 30,
							padding: 8,
							width: 200,
						}}
						onPress={borrowBook}
					>
						<Text style={{ fontSize: 23, textAlign: "center" }}>
							Imprumuta
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<View style={styles.bookDescriptionContainer}>
				<HTML
					source={{ html: bookInfo.description }}
					containerStyle={{}}
				/>
			</View>

			<View style={{ marginTop: 20 }}>
				<Rating
					type="custom"
					imageSize={30}
					tintColor={theme.colors.background}
					showRating
					onFinishRating={this.ratingCompleted}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
		flex: 1,
	},
	bookImageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	demoPlayerContainer: {
		backgroundColor: "#fff",
		width: 200,
		height: 25,
		borderRadius: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
	},
	bookDescriptionContainer: {
		backgroundColor: "#fff",
		marginTop: 20,
		borderRadius: 20,
		padding: 5,
	},
});
