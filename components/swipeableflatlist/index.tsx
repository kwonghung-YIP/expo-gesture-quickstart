import React from 'react'
import { Text, StyleSheet, SafeAreaView, StatusBar, Alert, Animated as Animated1 } from 'react-native'
import { FlatList, RectButton, Swipeable } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

const data = [{
    id: 'a',
    title: 'Item 1',
    info: 'info 1',
},{
    id: 'b',
    title: 'Item 2',
    info: 'info 2',
},{
    id: 'c',
    title: 'Item 3',
    info: 'info 3',
}]

const Row = (props:{
    title:string,
}) => {
    const onPress = () => Alert.alert(`click ${props.title}`)
    return (
        <RectButton style={[styles.listitem]} onPress={onPress}>
            <Text>{props.title}</Text>
        </RectButton>
    )
}

const SwipeableRow = (props) => {
    const renderRightActions = (
        progress:Animated1.AnimatedInterpolation,
        dragX:Animated1.AnimatedInterpolation
    ) => {
        const trans = dragX.interpolate({
            inputRange: [0,1],
            outputRange: [-20,1],
        })

        return (
            <Animated1.View style={{width:100}}>
                <Text>Rm</Text>
            </Animated1.View>
        )
    }
    return (
        <Swipeable
            rightThreshold={200}
            renderRightActions={renderRightActions}>
            {props.children}
        </Swipeable>
    )
}

const SwipeableFlatList = (props:{}) => {
    
    const renderItem = ({item}) => {
        return (
            <SwipeableRow>
                <Row  {...item}/>
            </SwipeableRow>
        )
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <FlatList
                data={data}
                renderItem={renderItem}/>
        </SafeAreaView>
    )
}

export default SwipeableFlatList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    listitem: {
        flex: 1,
        padding: 10,
        height: 60,
        width: 'auto',
        minWidth: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'green',
        marginBottom: 5,
        //borderBottomWidth: 4,
        //borderBottomColor: 'black',
    },
})