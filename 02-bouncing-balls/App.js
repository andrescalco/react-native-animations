import React, { useState, useEffect } from 'react';
import { View, Text, Button, Animated, Easing } from 'react-native';

import Ball from './src/Ball.js'

const COLORS = {
	purple: '#861789',
	yellow: '#FEFD00',
	orange: '#F98D00',
	red: '#F72400'
}

export default function App({ ...props }){
	const [bounce, setBounce] = useState(false); 
	const { container } = styles;

	useEffect(() => {
		setBounce(true)
	})

	return (
		<Animated.View style={container}>
			<Ball
				dimension={280}
				backgroundColor={COLORS.red}
				bounce={bounce}
				delay={300}
			>
				<Ball
					backgroundColor={COLORS.orange}
					dimension={230}
					bounce={bounce}
					delay={600}
				>
					<Ball
						backgroundColor={COLORS.yellow}
						dimension={180}
						bounce={bounce}
						delay={900}
					/>
				</Ball>
			</Ball>
		</Animated.View>
	);
	
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: COLORS.purple,
		justifyContent: 'center',
		alignItems: 'center'
	}
}

