import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES, PRIORITIES } from '../storage/todos';

const TodoItem = ({ todo, onToggle, onPress }) => {
    const category = CATEGORIES[todo.category?.toUpperCase()] || CATEGORIES.OTHER;
    const priority = PRIORITIES[todo.priority?.toUpperCase()] || PRIORITIES.MEDIUM;

    return (
        <TouchableOpacity
            style={[styles.todoItem, { borderLeftColor: priority.color }]}
            onPress={() => onPress(todo)}
            activeOpacity={0.7}
        >
            <TouchableOpacity
                style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}
                onPress={() => onToggle(todo.id)}
                disabled={todo.completed}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <MaterialCommunityIcons
                    name={todo.completed ? "lock" : "circle-outline"}
                    size={20}
                    color={todo.completed ? "#9CA3AF" : "#9CA3AF"}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <View style={styles.headerRow}>
                    <Text
                        style={[
                            styles.title,
                            todo.completed && styles.completedText,
                        ]}
                        numberOfLines={1}
                    >
                        {todo.title}
                    </Text>
                    {priority.id === 'high' && (
                        <View style={[styles.priorityBadge, { backgroundColor: priority.color }]}>
                            <Text style={styles.priorityText}>!</Text>
                        </View>
                    )}
                </View>

                <View style={styles.metaRow}>
                    <View style={[styles.categoryBadge, { backgroundColor: category.color + '20' }]}>
                        <MaterialCommunityIcons
                            name={category.icon}
                            size={12}
                            color={category.color}
                        />
                        <Text style={[styles.categoryText, { color: category.color }]}>
                            {category.label}
                        </Text>
                    </View>
                    <Text style={styles.date}>{todo.time}</Text>
                </View>
            </View>

            <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color="#E5E7EB"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: "white",
        marginTop: 8,
        marginHorizontal: 10,
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        flex: 1,
        marginRight: 8,
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "#9CA3AF",
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginRight: 8,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '600',
        marginLeft: 4,
    },
    date: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    priorityBadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priorityText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    checkboxCompleted: {
        opacity: 0.6,
    },
});

export default TodoItem;
