import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Loading = () => {
	return (
		<LinearGradient
			style={styles.container}
			colors={["lightblue", "whitesmoke", "lightblue"]}
			start={{ x: 1, y: 0.15 }}
		>
			<View>
				<Text style={styles.loading_text}>Загрузка погоды...</Text>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightblue",
	},
	loading_text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#222222",
	},
});

export default Loading;
