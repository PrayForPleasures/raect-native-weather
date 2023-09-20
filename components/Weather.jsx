import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const Weather = ({ time, temp }) => {
	return (
		<ScrollView contentContainerStyle={styles.weather_box}>
			<View style={styles.weather_minibox}>
				{time.map((el) => (
					<Text key={Math.random()} style={styles.weather_text}>
						Дата:&nbsp;
						{new Date(el).toLocaleDateString()}
						&nbsp;Время:&nbsp;
						{new Date(el).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						&nbsp;
					</Text>
				))}
			</View>
			<View style={styles.weather_minibox}>
				{temp.map((el) => (
					<Text key={Math.random()} style={styles.weather_text}>
						&rarr;&nbsp;Температура:
						{Math.round(el)}
					</Text>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	weather_box: {
		flexDirection: "row",
	},
	weather_minibox: {},
	weather_text: {
		marginBottom: 8,
		fontSize: 14,
	},
});

export default Weather;
