import React from "react";
import propTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Weather = ({
	time,
	temp,
	currentTime,
	currentTemp,
	latitude,
	longitude,
}) => {
	return (
		<LinearGradient
			style={styles.container}
			colors={["lightblue", "whitesmoke", "lightblue"]}
			start={{ x: 1, y: 0.15 }}
		>
			<View style={styles.location}>
				<Text>Текущая широта: {latitude}</Text>
				<Text>Текущая долгота: {longitude}</Text>
				<Text></Text>
			</View>
			<View style={styles.weather_box}>
				<View style={styles.weather_minibox}>
					{time.map((el) => (
						<Text key={el.id} style={styles.weather_text}>
							Дата:
							{new Date(el).toLocaleDateString()}
							&nbsp;Время:&nbsp;
							{new Date(el).toLocaleTimeString()}
						</Text>
					))}
				</View>

				<View style={styles.weather_minibox}>
					{temp.map((el) => (
						<Text key={el.id} style={styles.weather_text}>
							Температура:&nbsp;
							{Math.round(el)}
						</Text>
					))}
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	location: {
		flex: 1,
		justifyContent: "center",
	},
	weather_box: {
		flex: 8,
		flexDirection: "row",
	},
	weather_minibox: {},
	weather_text: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#222222",
		marginBottom: 8,
		fontSize: 14,
	},
});

export default Weather;
