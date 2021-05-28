import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";

export default function ModalChaptersContent({
	chapters,
	currentChapter,
	onChangeChapter,
}) {
	const theme = useTheme();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View
				style={{
					backgroundColor: theme.colors.surface,
					height: "70%",
					margin: 10,
					width: "90%",
					marginBottom: 20,
					borderRadius: 20,
					padding: 20,
				}}
			>
				<ScrollView>
					{chapters.map((c) => (
						<TouchableOpacity
							style={{ marginBottom: 20 }}
							onPress={() => {
								onChangeChapter(c.name);
							}}
							key={c.name}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								{currentChapter === c.name && (
									<AntDesign
										name="playcircleo"
										size={24}
										color="red"
										style={{ margin: 5 }}
									/>
								)}

								<Text style={{ fontSize: 20 }}>{c.name}</Text>
							</View>

							<Divider />
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	);
}
