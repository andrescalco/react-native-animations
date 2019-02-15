import React, { useEffect } from 'react';
import { View, Text, Button, Animated, Easing } from 'react-native';

const COLORS = {
	purple: '#861789',
	yellow: '#FEFD00',
	orange: '#F98D00',
	red: '#F72400'
}

const Ball = ({ delay, bounce, dimension, backgroundColor, ... props }) => {
	
	const position = new Animated.Value(1);
	const divider = new Animated.Value(2);

	useEffect( () => {
		
		if ( bounce ) {		
			const settings = {
				duration: 1000,
				ease: Easing.inOut
			};

			setTimeout( () => {
				Animated.loop(
					Animated.sequence([
						Animated.timing(position, {
							toValue: 0,
							...settings
						}),
						Animated.timing(position, {
							toValue: 1,
							...settings
						})
					])
				).start();
			}, delay)
		}
	}, [bounce])

	const animated_dimension = position.interpolate({
		inputRange: [0,1],
		outputRange: [dimension, (dimension + 40)]
	})

	const animated_border = position.interpolate({
		inputRange: [0,1],
		outputRange: [dimension / 2, (dimension + 40) / 2]
	})

	const style = {
		width: animated_dimension,
		height: animated_dimension,
		borderRadius: animated_border,
		backgroundColor: backgroundColor ? backgroundColor : '#000000',
		justifyContent: 'center',
		alignItems: 'center',
	}

	return (
		<Animated.View {...{style}}>
			{props.children}
		</Animated.View>
	);	
}

export default Ball;
