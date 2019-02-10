import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    PanResponder
} from 'react-native';

import Ball from './Ball';

const COLORS = {
	purple: '#561f9f',
	darkPurple: '#240b3f',
	green: '#38d5ff',
	grey: '#3088b7',
	grey2: '#9594a6',
	vividPurple: '#9439ff'
}

const { width, height } = Dimensions.get('window')

const BOTTOM_DISTANCE = 50;
const DIMENSION = 60;
const MARGIN_BOTTOM = 20;

export class Movable extends Component {
    constructor(props){
        super(props)
        
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                Animated.spring(position, {
                    toValue: { x:0, y:0 }
                }).start()
            }
        });
     
        this.state = { panResponder, position };
    }
    
    render() {
        return (
            <Animated.View
                style={[this.state.position.getLayout()]}
                {...this.state.panResponder.panHandlers}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class App extends Component {
    
    constructor(props) {
        super(props)
        this.animatedToggled = new Animated.Value(0)
        
        this.bottom_1 = new Animated.Value(-60)
        this.bottom_2 = new Animated.Value(-60)
        this.bottom_3 = new Animated.Value(-60)

        this.state = {
            isToggled: false
        }
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevState.isToggled !== this.state.isToggled) {
            Animated.timing(this.animatedToggled, {
                toValue: this.state.isToggled ? 1 : 0,
                duration: 200
            }).start();

            
            Animated.spring(this.bottom_1, {
                toValue: this.state.isToggled ? MARGIN_BOTTOM : -60,
                duration: 500
            }).start();
            
            Animated.spring(this.bottom_2, {
                toValue: this.state.isToggled ? (MARGIN_BOTTOM * 2) + DIMENSION : -60,
                duration: 700
            }).start();
            
            Animated.spring(this.bottom_3, {
                toValue: this.state.isToggled ? (MARGIN_BOTTOM * 3) + (DIMENSION * 2) : -60,
                duration: 900
            }).start();


        }
    }

    changeBGColor = () => {
        this.setState( state => ({
            isToggled: !state.isToggled
        }))
    }

	render() {
        
        const backgroundColor = this.animatedToggled.interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.purple, COLORS.darkPurple]
        });

        const buttonBackgroundColor = this.animatedToggled.interpolate({
            inputRange: [0, 1],
            outputRange: [COLORS.green, 'white']
        });

        const rotate = this.animatedToggled.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '405deg']
        });

        const ball_style = {
            backgroundColor: buttonBackgroundColor,
            transform: [ { rotate }]
        }

        const opacity = this.animatedToggled.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const purple_ball_style = {
            backgroundColor: COLORS.vividPurple,
            position: 'absolute',
            opacity,
            left: -30
        }

		return (
			<Animated.View style={[styles.container, { ...{backgroundColor} } ]}>

                <Ball drag style={{ ...purple_ball_style, bottom: this.bottom_1 }} />
                <Ball drag style={{ ...purple_ball_style, bottom: this.bottom_2 }} />
                <Ball drag style={{ ...purple_ball_style, bottom: this.bottom_3 }} />

                <Ball
                    style={{ ...ball_style }}
                    marginBottom={50}
                    onPress={this.changeBGColor}
                    text="+"
                />
                

            </Animated.View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})