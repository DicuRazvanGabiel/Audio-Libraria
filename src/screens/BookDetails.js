import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	ScrollView,
} from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import HTML from "react-native-render-html";
import { Rating, AirbnbRating } from "react-native-ratings";

const htmlContent = `
<h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat.<strong> La fiecare drum spre grădiniță sau școală, în orice călătorie lungă, copilul dumneavoastră nu se va mai plictisi!</strong></h1><h1><strong><span class="ql-cursor">﻿</span></strong>Opere<strong>le lui Petre Ispirescu sunt de nelipsit oricărui copil. În aceste noi interpretări, „Aleodor împărat”, „Greuceanu” </strong>sau „<em><u>Prâslea cel voinic” sunt eroii de basm care vă poartă prin aventuri fantastice, legendare, de ne</u></em>uitat
`;

import ImageBook from "../components/ImageBook";

export default function BookDetails() {
	const theme = useTheme();
	console.log(theme);
	return (
		<View style={styles.container}>
			<View style={styles.bookImageContainer}>
				<ImageBook
					imageUrl={
						"https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/normal/tata-bogat-tata-sarac_2702_1_1596556923.jpg"
					}
				/>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
						margin: 10,
					}}
				>
					<View style={{ marginBottom: 10 }}>
						<Text style={{ fontSize: 30, marginBottom: 5 }}>
							Tata bogat, tata sarac
						</Text>
						<Divider />
						<Text style={{ fontSize: 20 }}>robert kiyosaki</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Rating
							type="custom"
							imageSize={30}
							tintColor={theme.colors.background}
							showRating
							onFinishRating={this.ratingCompleted}
						/>
					</View>
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
				<TouchableOpacity
					style={{
						backgroundColor: "#FE805C",
						borderRadius: 30,
						padding: 8,
						width: 200,
					}}
				>
					<Text style={{ fontSize: 23, textAlign: "center" }}>
						Imprumuta
					</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1 }}>
				<ScrollView style={styles.bookDescriptionContainer}>
					<HTML source={{ html: htmlContent }} containerStyle={{}} />
				</ScrollView>
			</View>
		</View>
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
