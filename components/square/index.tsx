import { useRef } from "react"
import { Animated, Text, StyleSheet } from "react-native"
import { 
    PanGestureHandler, 
    State, 
    PanGestureHandlerGestureEvent, 
    PanGestureHandlerStateChangeEvent 
} from "react-native-gesture-handler"

const Square = (props:{}) => {

    const translateX: Animated.Value = new Animated.Value(0)
    const translateY: Animated.Value = new Animated.Value(0)
    const lastOffset: { x: number, y: number } = useRef({ x: 0, y: 0}).current

    const onPanGestureEvent:(event:PanGestureHandlerGestureEvent) => void = Animated.event([
        {
            nativeEvent: {
                translationX: translateX,
                translationY: translateY,
            },
        },
    ],{
        useNativeDriver: true,
    });

    const onPanHandlerStateChange = (event: PanGestureHandlerStateChangeEvent):void => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += event.nativeEvent.translationX;
            lastOffset.y += event.nativeEvent.translationY;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
        }        
    }

    return (
        <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}>
            <Animated.View style={[
                styles.square, 
                {
                    transform: [
                        { translateX: translateX },
                        { translateY: translateY },
                    ]
                },]}>
                <Text style={[styles.label]}>HeHe!</Text>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default Square

const styles = StyleSheet.create({
    square: {
        backgroundColor: 'blue',
        height: 100,
        width: 100,
        margin: 20,
        //alignSelf: 'center',
        //alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        elevation: 1,
    },
    label: {
        color: 'white',
        fontWeight: 'bold',
    }
})