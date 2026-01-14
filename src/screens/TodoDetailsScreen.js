import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AllScreen from './tabs/AllScreen';
import CompletedScreen from './tabs/CompletedScreen';
import TodoEditModal from './TodoEditModal';
import AddItemModal from '../components/AddItemModal';
import { useTodoContext } from "../storage/todos";

const Stack = createStackNavigator();

const AddButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 15 }}>
        <MaterialCommunityIcons name="plus-circle" size={32} color="#4F46E5" />
    </TouchableOpacity>
);

export const QuestsStack = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { refreshTodos } = useTodoContext();

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 }
            }}>
                <Stack.Screen
                    name="Active Quests"
                    component={AllScreen}
                    options={{
                        headerRight: () => <AddButton onPress={() => setModalVisible(true)} />,
                        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
                    }}
                />
                <Stack.Screen
                    name="TodoDetail"
                    component={TodoEditModal}
                    options={({ route }) => ({
                        title: route.params?.todo?.title || 'Quest Details',
                        presentation: 'modal'
                    })}
                />
            </Stack.Navigator>
            <AddItemModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onTodoAdded={refreshTodos}
            />
        </>
    );
};

export const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 }
        }}>
            <Stack.Screen
                name="Quest History"
                component={CompletedScreen}
                options={{
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }
                }}
            />
            <Stack.Screen
                name="TodoDetail"
                component={TodoEditModal}
                options={{ presentation: 'modal', title: 'Quest Log' }}
            />
        </Stack.Navigator>
    );
};