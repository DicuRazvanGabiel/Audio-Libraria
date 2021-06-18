import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Divider, useTheme } from "react-native-paper";

import { convertMinutesHours } from "../Utils";

export default function ModalChaptersContent({
	chapters,
	currentChapter,
	onChangeChapter,
}) {
	const theme = useTheme();
	console.log({ chapters });
	const ViewTouchable = onChangeChapter ? TouchableOpacity : View;

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
					width: "100%",
					marginBottom: 20,
					borderRadius: 20,
					padding: 20,
				}}
			>
				<ScrollView>
					{chapters.map((c) => (
						<ViewTouchable
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
								<View
									style={{
										justifyContent: "space-between",
										flexDirection: "row",
									}}
								>
									<Text
										style={[
											{ fontSize: 20, flex: 2 },
											currentChapter === c.name && {
												color: "red",
											},
										]}
									>
										{c.name}
									</Text>

									<Text
										style={[
											{ textAlign: "right", flex: 1 },
											currentChapter === c.name && {
												color: "red",
											},
										]}
									>
										{convertMinutesHours(c.duration)}
									</Text>
								</View>
							</View>

							<Divider />
						</ViewTouchable>
					))}
				</ScrollView>
			</View>
		</View>
	);
}
