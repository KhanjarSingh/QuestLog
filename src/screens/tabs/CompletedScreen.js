import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTodoContext } from "../../storage/todos";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TodoItem from "../../components/TodoItem";

const CompletedScreen = () => {
  const { completedTodos, toggleTodo } = useTodoContext();
  const navigation = useNavigation();

  const handleToggle = async (id) => {
    await toggleTodo(id);
  };

  const handleTodoPress = (todo) => {
    navigation.navigate('TodoDetail', { todo });
  };

  return (
    <FlatList
      data={completedTodos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={handleToggle}
          onPress={handleTodoPress}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            size={80}
            color="#e0e0e0"
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>No Completed Tasks</Text>
          <Text style={styles.emptySubtitle}>
            Start working on your pending tasks to see them here once completed!
          </Text>
        </View>
      }
      contentContainerStyle={completedTodos.length === 0 ? styles.emptyListContainer : { paddingBottom: 100 }}
    />
  );
};

const styles = StyleSheet.create({
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

export default CompletedScreen;