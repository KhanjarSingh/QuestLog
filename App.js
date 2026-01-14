import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from './src/screens/SettingsScreen';
import TodoNavigator from './src/screens/TodoDetailsScreen';
import AuthScreen from './src/screens/AuthScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';
import { TodoProvider, useTodoContext } from './src/storage/todos';

const Drawer = createDrawerNavigator();

const MainApp = () => {
  const { user, loading } = useTodoContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <Drawer.Navigator initialRouteName='My Quests'>
      <Drawer.Screen name="My Quests" component={TodoNavigator} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Drawer.Screen name="Profile & Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <MainApp />
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
