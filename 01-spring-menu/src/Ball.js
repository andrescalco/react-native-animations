import React from 'react';
import { View, TouchableWithoutFeedback, Animated, Text } from 'react-native';
import { Movable } from './App';

function Ball({ drag, onPress, marginBottom, backgroundColor, text, panResponder, ...props }) {
    
    const style = {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: marginBottom ? marginBottom : 0,
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
    }

    const text_style = {
        fontSize: 38,
        alignSelf: 'center',
        textAlign: 'center'
    }

    if (drag) {
        return (
            <Movable>
                <TouchableWithoutFeedback {...{onPress}}>
                    <Animated.View { ...{style} }>
                        <Text style={text_style}>{text}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Movable>
        );        
    }
    return (
        <TouchableWithoutFeedback {...{onPress}}>
            <Animated.View { ...{style} }>
                <Text style={text_style}>{text}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

export default Ball;
