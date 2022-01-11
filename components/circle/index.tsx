import * as React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { 
    PanGestureHandler, 
    State, 
    PanGestureHandlerGestureEvent, 
    PanGestureHandlerStateChangeEvent 
} from 'react-native-gesture-handler'

export default class DraggableCircle extends React.Component {

    private translateX:Animated.Value;
    private translateY:Animated.Value;
    private lastOffset: { x: number, y: number };

    private onPanGestureEvent: (event: PanGestureHandlerGestureEvent) => void;

    constructor(props:any) {
        super(props);
        this.translateX = new Animated.Value(0);
        this.translateY = new Animated.Value(0);
        this.lastOffset = { x: 0, y: 0 };

        this.onPanGestureEvent = Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this.translateX,
                        translationY: this.translateY,
                    },
                },
            ],
            { 
                useNativeDriver: true,
            }
        )
    }

    private onPanHandlerStateChange = (event: PanGestureHandlerStateChangeEvent):void => {
        //console.log(event.nativeEvent);
        if (event.nativeEvent.oldState === State.ACTIVE) {
            //console.log(this.lastOffset);
            this.lastOffset.x += event.nativeEvent.translationX;
            this.lastOffset.y += event.nativeEvent.translationY;
            this.translateX.setOffset(this.lastOffset.x);
            this.translateX.setValue(0);
            this.translateY.setOffset(this.lastOffset.y);
            this.translateY.setValue(0);
        }        
    }

    render() {
        return (
            <PanGestureHandler
                onGestureEvent={this.onPanGestureEvent}
                onHandlerStateChange={this.onPanHandlerStateChange}>
                <Animated.View
                    style={[
                        styles.circle,
                        {
                            transform: [
                                { translateX: this.translateX },
                                { translateY: this.translateY },
                            ]
                        },]}>
                    <Text style={[styles.label]}>HaHa!</Text>
                </Animated.View>
            </PanGestureHandler>
        )
    }
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: 'red',
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 20,
        //alignSelf: 'center',
        //alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        elevation: 2,
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
    }
})
