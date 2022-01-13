import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Circle from './components/circle';
import Square from './components/square';
import Triangle from './components/triangle';
import SwipeableFlatList from './components/swipeableflatlist'
import ItemList from './components/itemlist'

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar/>
        <Circle/>
        <Square/>
        <Triangle/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
