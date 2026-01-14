import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTodoContext, CATEGORIES } from "../../storage/todos";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TodoItem from "../../components/TodoItem";

const AllScreen = () => {
  const { todos, toggleTodo } = useTodoContext();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleToggle = async (id) => {
    await toggleTodo(id);
  };

  const handleTodoPress = (todo) => {
    navigation.navigate('TodoDetail', { todo });
  };

  const filteredTodos = selectedCategory
    ? todos.filter(todo => todo.category === selectedCategory)
    : todos;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedCategory && styles.activeFilterChip
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.filterText, !selectedCategory && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>

          {Object.values(CATEGORIES).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.filterChip,
                selectedCategory === cat.id && { backgroundColor: cat.color, borderColor: cat.color }
              ]}
              onPress={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
            >
              <MaterialCommunityIcons
                name={cat.icon}
                size={16}
                color={selectedCategory === cat.id ? 'white' : '#666'}
                style={{ marginRight: 5 }}
              />
              <Text style={[
                styles.filterText,
                selectedCategory === cat.id && { color: 'white' }
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTodos}
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
              name="note-plus-outline"
              size={80}
              color="#e0e0e0"
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>
              {selectedCategory ? "No Todos in this Category" : "No Todos Yet"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedCategory ? "Tap + to add one!" : "Tap the + button to create your first todo and get started!"}
            </Text>
          </View>
        }
        contentContainerStyle={filteredTodos.length === 0 ? styles.emptyListContainer : { paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterContent: {
    paddingHorizontal: 15,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  activeFilterChip: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#fff',
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