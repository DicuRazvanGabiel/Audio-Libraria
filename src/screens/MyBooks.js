import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";
import { UserContext } from "../Context/UserContext";
import firestore from "@react-native-firebase/firestore";
import LoadingState from "../components/LoadingState";
import BookListItem from "../components/BookListItem";

export default function MyBooks({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [borrowedBookInfo, setBorrowedBookInfo] = useState(null);
	const { employee } = useContext(UserContext);
	console.log(employee);

	const fetchUserAndBookData = async () => {
		setLoading(true);
		let bookID = null;
		let author = null;
		let businessBookID = null;
		if (employee) {
			const employeeSnap = await firestore()
				.doc(
					`businesses/${employee.businessID}/employees/${employee.employeeID}`
				)
				.get();

			if (employeeSnap.data().borrowedBook) {
				const businessBookSnap = await firestore()
					.doc(
						`businesses/${employee.businessID}/businessBooks/${
							employeeSnap.data().borrowedBook
						}`
					)
					.get();
				console.log(businessBookSnap.data());
				bookID = businessBookSnap.data().books;
				author = businessBookSnap.data().author;
				businessBookID = businessBookSnap.id;
				setBorrowedBookInfo({
					bookID,
					author,
					businessBookID,
				});
			}
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
	console.log(borrowedBookInfo);
	return (
		<ScrollView>
			{borrowedBookInfo && (
				<View style={styles.borrowedBookSection}>
					<Text>Cartea imprumutata</Text>
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
	borrowedBookSection: {},
});
