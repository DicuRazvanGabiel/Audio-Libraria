import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";
import { UserContext } from "../Context/UserContext";
import firestore from "@react-native-firebase/firestore";
import LoadingState from "../components/LoadingState";
import BookListItem from "../components/BookListItem";
import { checkBorrowBookForEmployee } from "../Utils";

export default function MyBooks({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [borrowedBookInfo, setBorrowedBookInfo] = useState(null);
	const { employee } = useContext(UserContext);

	const fetchUserAndBookData = async () => {
		setBorrowedBookInfo(null);
		setLoading(true);
		if (employee) {
			const borrowedBook = await checkBorrowBookForEmployee(
				employee,
				firestore()
			);
			setBorrowedBookInfo(borrowedBook);
		}
		setLoading(false);
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			fetchUserAndBookData();
		});
		return unsubscribe;
	}, [navigation]);

	if (loading) return <LoadingState />;

	return (
		<ScrollView>
			{borrowedBookInfo && (
				<View style={styles.borrowedBookSection}>
					<BookListItem
						navigation={navigation}
						bookID={borrowedBookInfo.bookID}
						author={borrowedBookInfo.author}
						businessBookID={borrowedBookInfo.businessBookID}
					/>

					<Divider />
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	borrowedBookSection: {
		marginTop: 10,
	},
});
