import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllScreen from './tabs/AllScreen';
import CompletedScreen from './tabs/CompletedScreen'
import PendingScreen from './tabs/PendingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, Button } from 'react-native';
import AddItemModal from '../components/AddItemModal';
import { useTodoContext } from "../storage/todos";
import { createStackNavigator } from '@react-navigation/stack';
import TodoEditModal from './TodoEditModal';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TodoDetailsScreen = () => {
    const [visible, setVisible] = useState(false)
    
    const { refreshTodos } = useTodoContext();

    return (
        <>

            <Tab.Navigator screenOptions={{
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => setVisible(true)}
                        style={{ marginRight: 15, }}
                    >
                        <MaterialCommunityIcons name="plus-circle-outline" size={26} color="blue" />
                    </TouchableOpacity>
                ),
            }}>
                <Tab.Screen name="All" component={AllScreen} options={{
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='format-list-bulleted' color={color} size={size} />
                    )

                }} />
                <Tab.Screen name="Completed" component={CompletedScreen} options={{
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='check-circle-outline' color={color} size={size} />
                    )
                }} />
                <Tab.Screen name='Pending' component={PendingScreen} options={{
                    tabBarLabelStyle: {
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='clock-outline' color={color} size={size} />
                    )
                }} />
            </Tab.Navigator>


            <AddItemModal
             visible={visible} 
             onClose={() => setVisible(false)}
             onTodoAdded={refreshTodos}  />
        </>
    )
}
const TodoNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="TodoTabs"
                component={TodoDetailsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TodoDetail"
                component={TodoEditModal}
                options={({ route }) => ({
                    title: route.params?.todo?.title || 'Todo Details',
                    headerBackTitle: 'Back',
                })}
            />
        </Stack.Navigator>
    );
};
export default TodoNavigator