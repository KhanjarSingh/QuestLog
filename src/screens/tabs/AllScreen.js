import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTodoContext, CATEGORIES } from "../../storage/todos";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TodoItem from "../../components/TodoItem";

const AllScreen = () => {
  const { todos, toggleTodo, user } = useTodoContext();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleToggle = async (id) => {
    await toggleTodo(id);
  };

  const handleTodoPress = (todo) => {
    navigation.navigate('TodoDetail', { todo });
  };

  const filteredTodos = todos
    .filter(todo => !todo.completed)
    .filter(todo => selectedCategory === null || todo.category === selectedCategory);

  const renderHeader = () => (
    <View>
      <View style={styles.heroStatsContainer}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroWelcome}>Welcome, {user?.username || 'Hero'}!</Text>
          <Text style={styles.heroLevel}>Lvl {user?.level || 1}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="fire" size={24} color="#F59E0B" />
            <Text style={styles.statValue}>{user?.streak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="star-four-points" size={24} color="#6366F1" />
            <Text style={styles.statValue}>{user?.xp || 0}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="trophy-outline" size={24} color="#10B981" />
            <Text style={styles.statValue}>#{user?.rank || '-'}</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
        </View>

        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBar, { width: `${Math.min((user?.xp % 100) || 0, 100)}%` }]} />
        </View>
        <Text style={styles.xpText}>{100 - ((user?.xp || 0) % 100)} XP to wait Level {user?.level + 1}</Text>
      </View>

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
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
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
              name="sword-cross"
              size={80}
              color="#e0e0e0"
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>
              {selectedCategory ? "No Quests in this Category" : "No Active Quests"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedCategory ? "Switch categories or add one!" : "You're all caught up! Check 'History' for completed quests or add a new one."}
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
  heroStatsContainer: {
    backgroundColor: '#fff',
    margin: 15,
    marginBottom: 5,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#EEF2FF'
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  heroWelcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  heroLevel: {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 12,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  xpBarContainer: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  xpText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
    textAlign: 'right',
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