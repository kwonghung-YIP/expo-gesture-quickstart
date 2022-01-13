import { useCallback, useRef, useState } from 'react'
import { Text, StyleSheet, Dimensions, Alert } from 'react-native'
import { Gesture, GestureDetector, GestureUpdateEvent, PanGestureHandlerEventPayload, RectButton, ScrollView } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

interface ItemPojo {
    id: string;
    title: string;
    info: string;
}

const DATA:Array<ItemPojo> = [{
    id: 'a',
    title: '6+9',
    info: 'info 1',
},{
    id: 'b',
    title: '4+6',
    info: 'info 2',
},{
    id: 'c',
    title: '5+8',
    info: 'info 3',
},{
    id: 'd',
    title: '3+5',
    info: 'info 4',
},{
    id: 'e',
    title: '9+2',
    info: 'info 5',
},{
    id: 'f',
    title: '2+5',
    info: 'info 6',
},{
    id: 'g',
    title: '3+11',
    info: 'info 7',
},{
    id: 'h',
    title: '7+2',
    info: 'info 8',
},{
    id: 'i',
    title: '6+6',
    info: 'info 9',
}]

const ROW_HEIGHT = 50
const { width: SCREEN_WIDTH } = Dimensions.get('window')
const DELETE_THREDSHOLD = -SCREEN_WIDTH * 0.5

const Item = (props:{
    data: ItemPojo,
    removeItem: (item:ItemPojo) => void,
}) => {
    const {id,title} = props.data
    const {removeItem} = props

    const ref = useRef(null)

    const translateX = useSharedValue(0)
    const opacity = useSharedValue(1)
    const height = useSharedValue(ROW_HEIGHT)
    const marginVertical = useSharedValue(5)

    const containerAnimatedStyle = useAnimatedStyle(()=>{
        const triggerDeleteRow = translateX.value < DELETE_THREDSHOLD
        return {
            opacity: opacity.value,//withTiming(triggerDeleteRow?0:1,{duration:1000}),
            height: height.value,
            marginVertical: marginVertical.value
        }
    })

    const rowAnimatedStyle = useAnimatedStyle(()=>({
        transform: [{
            translateX: translateX.value,
        },],
    }))

    const panGesture = Gesture.Pan()
        .onUpdate((e:GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
            //console.log(`SCREEN_WIDTH:${SCREEN_WIDTH},translationX:${e.translationX}`)
            translateX.value = e.translationX
        })
        .onEnd(() => {
            const triggerDeleteRow = translateX.value < DELETE_THREDSHOLD
            if (triggerDeleteRow) {
                translateX.value = withTiming(-SCREEN_WIDTH)
                opacity.value = withTiming(0)
                height.value = withTiming(0)
                marginVertical.value = withTiming(0,{duration:500},(completed) => {
                    if (completed) {
                        //console.log(`item '${id}' deleted!`)
                        runOnJS(removeItem)(props.data)
                    }
                })
            } else {
                translateX.value = withTiming(0) //withSpring(0)
            }
        })

    return (
        <Animated.View style={[styles.container,containerAnimatedStyle]}>
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.rectButton,rowAnimatedStyle]}>
                    <Text style={[styles.text]}>{title}</Text>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    )
}
const ItemList = (props:{}) => {
    const [ items, setItems ] = useState(DATA);

    const removeItem = useCallback((target:ItemPojo) => {
        setItems((items) => items.filter((item) => item.id !== target.id));
    }, []);

    console.log(`render:# of items:${items.length}`)
    return (
        <ScrollView style={[styles.scrollView]}>
        {items.map((item:ItemPojo) => (
            <Item key={item.id} data={item} removeItem={removeItem}/>
        ))}
        </ScrollView>
    )
}

export default ItemList

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: '#fff',
        //marginVertical: 5,
        marginHorizontal: 5,      
    },
    rectButton: {
        backgroundColor: '#fff',
        height: ROW_HEIGHT,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowColor: 'grey',
        elevation: 6,          
    },
    text: {
        fontSize: 14,
        fontWeight: "800",
    }
})

/*
backgroundColor: 'white',
height: ROW_HEIGHT,
paddingVertical: 5,
marginBottom: 10,
paddingHorizontal: 10,
marginHorizontal: 5,
borderRadius: 5,
shadowOpacity: 0.8,
shadowOffset: {
    width: 0,
    height: 5,
},
shadowColor: 'green',
elevation: 5,
*/