import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TodoProvider, useTodoContext } from './src/storage/todos';
import { QuestsStack, HistoryStack } from './src/screens/TodoDetailsScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AuthScreen from './src/screens/AuthScreen';
import 'react-native-get-random-values';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const { user, loading } = useTodoContext();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
        }
      }}
    >
      <Tab.Screen
        name="Quests"
        component={QuestsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sword" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
