import React from "react";
import {
	View,
	Dimensions,
	Platform,
	TouchableOpacity,
	Image,
} from "react-native";
import { Appbar, useTheme, Avatar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import auth from "@react-native-firebase/auth";

export default function CustomNavigationBar({ navigation, previous }) {
	const route = useRoute();
	const { colors } = useTheme();
	let user = auth().currentUser;

	return (
		<View style={{ backgroundColor: colors.background }}>
			<View
				style={{
					borderBottomLeftRadius: 30,
					borderBottomRightRadius: 30,
					overflow: "hidden",
				}}
			>
				<LinearGradient
					style={{
						width,
						paddingVertical: Platform.OS === "android" ? 7 : 0,
					}}
					start={[0, 1]}
					end={[1, 0]}
					colors={["rgba(246,110,180,1)", "rgba(254,182,101,1)"]}
				>
					<Appbar.Header
						style={{
							backgroundColor: "rgba(246,110,180,0)",
							elevation: 0,
						}}
					>
						{previous ? (
							<Appbar.BackAction onPress={navigation.goBack} />
						) : (
							<View style={{ marginLeft: 20 }}>
								<Image
									style={{ height: 45, width: 45 }}
									source={require("../../assets/logo/white.png")}
								/>
							</View>
						)}
						<Appbar.Content title={route.name} color="#fff" />
						{user && (
							<TouchableOpacity
								style={{ marginRight: 10, marginBottom: 10 }}
								onPress={() => navigation.navigate("Settings")}
							>
								{user.photoURL ? (
									<Avatar.Image
										size={45}
										source={{
											uri: user.photoURL,
										}}
									/>
								) : (
									<Avatar.Icon size={45} icon="account" />
								)}
							</TouchableOpacity>
						)}
					</Appbar.Header>
				</LinearGradient>
			</View>
		</View>
	);
}
