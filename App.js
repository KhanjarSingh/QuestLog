import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from './src/screens/SettingsScreen';
import TodoNavigator from './src/screens/TodoDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';
import { TodoProvider } from './src/storage/todos';


export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <TodoProvider>
    <NavigationContainer> 
      <Drawer.Navigator initialRouteName='My Todos'>
        <Drawer.Screen name="My Todos" component={TodoNavigator} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </TodoProvider>
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
