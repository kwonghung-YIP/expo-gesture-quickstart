import { View, Text, StyleSheet } from 'react-native'
import { Gesture, GestureDetector, GestureUpdateEvent, PanGesture, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const Triangle = (props:{}) => {

    const translationX:SharedValue<number> = useSharedValue(0)
    const translationY:SharedValue<number> = useSharedValue(0)
    const lastOffset:SharedValue<{x:number,y:number}> = useSharedValue({x:0,y:0})
    
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translationX.value},
                { translateY: translationY.value },
            ],
        }
    })

    const panGesture:PanGesture = Gesture.Pan()
        .onUpdate((e:GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
            //console.log(e)
            translationX.value = e.translationX + lastOffset.value.x
            translationY.value = e.translationY + lastOffset.value.y
            //console.log(`translation:(${translationX.value},${translationY.value})`)
        })
        .onEnd(() => {
            //console.log('onEnd')
            lastOffset.value = {
                x: translationX.value,
                y: translationY.value,
            }
        })

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.triangle, animatedStyles]}/>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderTopWidth: 0,
        borderBottomWidth: 100,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "green",
    },
});

export default Triangle