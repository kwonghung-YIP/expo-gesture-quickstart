import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Circle from './components/circle';
import Square from './components/square';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Circle/>
      <Square/>
      <StatusBar/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
