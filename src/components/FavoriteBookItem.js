import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Divider, Surface, useTheme } from "react-native-paper";

export default function FavoriteBookItem({ navigation, book }) {
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.push("BookDetails", {
					bookID: book.id,
				});
			}}
		>
			<Surface style={styles.surface}>
				<Image
					source={{
						uri: book.data().image,
					}}
					style={styles.image}
				/>
				<View
					style={{
						marginLeft: 10,
						marginTop: 10,
						justifyContent: "space-between",
						width: "80%",
					}}
				>
					<View>
						<Text
							style={{
								fontSize: 22,
								fontWeight: "bold",
							}}
						>
							{book.data().title}
						</Text>
						<Text style={{ fontSize: 18 }}>
							{book.data().author}
						</Text>
					</View>
				</View>
			</Surface>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	surface: {
		height: 150,
		padding: 10,
		flex: 1,
		elevation: 4,
		marginHorizontal: 10,
		borderRadius: 10,
		flexDirection: "row",
		marginBottom: 10,
	},
	image: {
		height: 130,
		width: 90,
		resizeMode: "stretch",
	},
});
