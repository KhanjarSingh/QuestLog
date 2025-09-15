import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useTodoContext } from "../../storage/todos";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AllScreen = () => {
  const { todos, toggleTodo } = useTodoContext();
  const navigation = useNavigation();

  const handleToggle = async (id) => {
    await toggleTodo(id);
  };

  const handleTodoPress = (todo) => {
    navigation.navigate('TodoDetail', { todo });
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.todoItem}
          onPress={() => handleTodoPress(item)}
          activeOpacity={0.7}
        >
          <TouchableOpacity onPress={() => handleToggle(item.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialCommunityIcons
              name={item.completed ? "check-circle" : "circle-outline"}
              size={24}
              color={item.completed ? "green" : "gray"}
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
            <Text style={styles.date}>{item.time}</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="note-plus-outline"
            size={80}
            color="#e0e0e0"
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>No Todos Yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap the + button to create your first todo and get started!
          </Text>
        </View>
      }
      contentContainerStyle={todos.length === 0 ? styles.emptyListContainer : null}
    />
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  emptyListContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 100,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default AllScreen;