import React, { useEffect, useState, useContext } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { Text, Divider, useTheme, ActivityIndicator, Button, Portal, Modal } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import HTML from "react-native-render-html";
import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";
import TrackPlayer, { State }  from "react-native-track-player";
import auth from "@react-native-firebase/auth";
import { RFPercentage } from "react-native-responsive-fontsize";

import { UserContext } from "../Context/UserContext";
import { PlayerContext } from "../Context/PlayerContext";
import { isCurrentBorrowBook } from "../Utils";

import ImageBook from "../components/ImageBook";
import LoadingState from "../components/LoadingState";
import PlayBookPlayDemoButton from "../components/PlayBookPlayDemoButton";
import RatingStars from "../components/RatingStars";

const db = firestore();

export default function BookDetails({ navigation, route }) {
	const { employee } = useContext(UserContext);
	const theme = useTheme();
	const { bookID } = route.params;
	const [businessBookID, setBusinessBookID] = useState(
		route.params.businessBookID
	);
	const [bookInfo, setBookInfo] = useState(null);
	const [borrowedBook, setBorrowedBook] = useState(null);
	const { player, setPlayer } = useContext(PlayerContext);
	const [loadingBarrowButton, setLoadingBarrowButton] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [showAvailabilityModal, setShowAvailabilityModal] = useState(route.params.businessBookID ? false : true)
	const userID = auth().currentUser.uid;

	const fetchBookInfo = async () => {
		let book = {};
		const bookSnap = await db.collection("books_info").doc(bookID).get();
		book = {
			id: bookSnap.id,
			...bookSnap.data(),
		};

		if (!businessBookID) {
			const bussinessBookSnap = await db
				.collection("businesses")
				.doc(employee.businessID)
				.collection("businessBooks")
				.where("books", "==", bookID)
				.get();
			if (bussinessBookSnap.size === 1) {
				setShowAvailabilityModal(false);
				setBusinessBookID(bussinessBookSnap.docs[0].id);
			}
		}
		const favoriteBookSnap = await db
			.collection("users")
			.doc(userID)
			.collection("favorite")
			.doc(bookID)
			.get();

		if (favoriteBookSnap.exists) {
			setIsFavorite(true);
		} else {
			setIsFavorite(false);
		}

		setBookInfo(book);
		setBorrowedBook(
			await isCurrentBorrowBook(employee, businessBookID, db)
		);
	};

	useEffect(() => {
		fetchBookInfo();
	}, [route.params]);

	const borrowBook = async () => {
		setLoadingBarrowButton(true);
		functions()
			.httpsCallable("barrowBook")({
				businessBookID: businessBookID,
				businessID: employee.businessID,
				employeeID: employee.employeeID,
				bookID: bookID,
				uid: userID,
			})
			.then(async (response) => {
				if (!response.data.ok) {
					Alert.alert("Imprumutarea cartii", response.data.error, [
						{
							text: "OK",
							onPress: () => console.log("OK Pressed"),
						},
					]);
				} else {
					setBorrowedBook(true);
					const state = await TrackPlayer.getState();
					if (state === State.Playing) {
						await TrackPlayer.stop();
						await TrackPlayer.destroy();
						setPlayer(null);
					}
				}

				setLoadingBarrowButton(false);
			});
	};

	const unBarrow = async () => {
		setLoadingBarrowButton(true);
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
					await TrackPlayer.stop();
					await TrackPlayer.destroy();
				}
				setPlayer(null);
				setLoadingBarrowButton(false);
			});
	};

	const playBook = () => {
		if (borrowedBook) {
			if (player && player.bookInfo.id === bookInfo.id) {
				navigation.navigate("Player", {
					firstInit: false,
				});
			} else {
				navigation.navigate("Player", {
					firstInit: true,
				});
				setPlayer({ ...player, bookInfo: bookInfo });
			}
		} else {
			playDemoFunction();
		}
	};

	const playDemoFunction = async () => {
		const bookSnap = await db.collection("books").doc(bookID).get();
		const demoURL = bookSnap.data().chapters[1]
			? bookSnap.data().chapters[1].file.src
			: bookSnap.data().chapters[0].file.src;
		const state = await TrackPlayer.getState();

		if (state === State.Playing) {
			// await TrackPlayer.reset();
			await TrackPlayer.stop();
			await TrackPlayer.destroy();
		} else {
			// await TrackPlayer.stop();
			// await TrackPlayer.destroy();
			await TrackPlayer.setupPlayer({});
			await TrackPlayer.add([
				{
					id: 0,
					url: demoURL,
					title: bookSnap.data().title,
					album: bookSnap.data().title,
					artist: bookInfo.author,
					duration: 60,
					artwork: bookInfo.imageSrc,
				},
			]);

			TrackPlayer.play();
		}
	};

	const onFavorite = async () => {
		setIsFavorite(!isFavorite);
		functions()
			.httpsCallable("onFavorite")({
				bookID: bookID,
				bookInfo: bookInfo,
				userID: userID,
			});
	};

	//method for showing alert message befor borrow
	const showBorrowAlert = () => {
		Alert.alert(
			"Sunteti sigur...? ",
			"Cartea pe care o aveti deja imprumutata, va fi returnata",
			[
				{
					text: "NU",
					onPress: () => {},
				},
				{
					text: "DA",
					onPress: () => {
						borrowBook();
					},
				}
			]
		);
	};

	//method for showing alert message befor UNborrow
	const showUNBorrowAlert = () => {
		Alert.alert(
			"Sunteti sigur...? ",
			"Cartea pe care o aveti deja imprumutata, va fi returnata",
			[
				{
					text: "NU",
					onPress: () => {},
				},
				{
					text: "DA",
					onPress: () => {
						unBarrow();
					},
				},
				
			]
		);
	};

	const renderactionButton = () => {
		if (!businessBookID) return;
		if (loadingBarrowButton)
			return (
				<View style={{ marginTop: 20, alignItems: 'center' }}>
					<ActivityIndicator size="small" />
				</View>
			);

		return (
			<View style={{marginTop: 10}}>
				{borrowedBook ? (
					<Button icon="keyboard-return" mode="outlined" onPress={showUNBorrowAlert} color={theme.colors.accent}>
						Returneaza
				  	</Button>
				) : (
					<Button icon="book" mode="outlined" onPress={showBorrowAlert} color={theme.colors.accent}>
						Imprumuta
					</Button>
				)}
			</View>
		);
	};

	const onStarPress = async (starNo) => {
		functions()
			.httpsCallable("rateBook")({
				bookID: bookID,
				stars: starNo,
				uid: auth().currentUser.uid,
			})
			.then(async (response) => {
				console.log(response);
			});
	};

	if (!bookInfo) return <LoadingState />;

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.bookImageContainer}>
				<ImageBook imageUrl={bookInfo.imageSrc} />
				<View
					style={{
						flex: 1,
						marginLeft: 10,
						height: 200
					}}
				>
					<Text style={{ fontSize: RFPercentage(3.6), marginBottom: 5 }} numberOfLines={4}>
						{bookInfo.title}
					</Text>
					<Divider />
					<Text style={{ fontSize: 20 }} adjustsFontSizeToFit={true}>{bookInfo.author}</Text>
				</View>
			</View>
			

			<PlayBookPlayDemoButton
				borrowedBook={borrowedBook}
				playBook={playBook}
				navigation={navigation}
			/>

			{renderactionButton()}

			<TouchableOpacity onPress={onFavorite} style={{ alignItems: 'flex-end', marginTop: 10}}>
				<Ionicons
					name={isFavorite ? "heart" : "heart-outline"}
					size={29}
					color={theme.colors.accent}
				/>
			</TouchableOpacity>

				<HTML
					source={{ html: bookInfo.description }}
					containerStyle={{ backgroundColor: theme.colors.background}}
					baseFontStyle={{color: '#fff', fontSize: 20, textAlign: 'justify'}}
					defaultTextProps={{allowFontScaling: false}}
				/>

			<Portal>
				<Modal
					visible={showAvailabilityModal}
					onDismiss={() => {
						setShowAvailabilityModal(false);
					}}
					contentContainerStyle={{
						backgroundColor: theme.colors.surface,
						margin: 10,
						marginBottom: 20,
						borderRadius: 20,
						padding: 20,
					}}
				>
					<View>
						<Text style={{fontSize: 18}}>Aceasta carte nu este detinuta de firma dumneavoastra</Text>
					</View>
				</Modal>
			</Portal>
			
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 7,
		flex: 1,
	},
	bookImageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	demoPlayerContainer: {
		backgroundColor: "#fff",
		flex: 1,
		height: 30,
		borderRadius: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginRight: 30,
	},
	bookDescriptionContainer: {
		backgroundColor: "#fff",
		marginTop: 20,
		borderRadius: 20,
		padding: 5,
	},
});
