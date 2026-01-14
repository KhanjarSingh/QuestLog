import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTodoContext, CATEGORIES } from '../storage/todos';

const { width } = Dimensions.get('window');

const SettingsScreen = () => {
  const { stats, todos, refreshTodos, user, logout } = useTodoContext();

  const handleClearCompleted = () => {
    Alert.alert(
      "Clear Completed Todos",
      `Are you sure you want to delete all ${stats.completed} completed todos? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {

            Alert.alert("Success", "Completed todos cleared!");
          }
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Todos",
      `Are you sure you want to delete ALL ${stats.total} todos? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {

            Alert.alert("Success", "All todos cleared!");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Profile Section */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons name="account-circle" size={60} color="#4F46E5" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user?.username || 'Hero'}</Text>
          <Text style={styles.levelBadge}>Level {user?.level || 1}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.xpSection}>
        <Text style={styles.xpLabel}>Experience: {user?.xp || 0} XP</Text>
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBar, { width: `${Math.min((user?.xp % 100) || 0, 100)}%` }]} />
        </View>
        <Text style={styles.xpNextLevel}>{100 - ((user?.xp || 0) % 100)} XP to next level</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Your Progress</Text>


        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
            <MaterialCommunityIcons name="format-list-bulleted" size={32} color="#1976D2" />
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#E8F5E8' }]}>
            <MaterialCommunityIcons name="check-circle" size={32} color="#388E3C" />
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
            <MaterialCommunityIcons name="clock-outline" size={32} color="#F57C00" />
            <Text style={styles.statNumber}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>


      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📈 Breakdown by Category</Text>
        <View style={styles.categoryStatsGrid}>
          {Object.values(CATEGORIES).map((cat) => {
            const count = todos.filter(t => t.category === cat.id).length;
            if (count === 0) return null;
            return (
              <View key={cat.id} style={[styles.categoryStatItem, { borderColor: cat.color }]}>
                <MaterialCommunityIcons name={cat.icon} size={20} color={cat.color} />
                <Text style={styles.categoryStatCount}>{count}</Text>
                <Text style={[styles.categoryStatLabel, { color: cat.color }]}>{cat.label}</Text>
              </View>
            );
          })}
          {todos.length === 0 && (
            <Text style={styles.emptyStatsText}>Add some todos to see breakdown!</Text>
          )}
        </View>
      </View>










      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ About</Text>

        <TouchableOpacity style={styles.infoItem}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="#607D8B" />
          <Text style={styles.infoText}>Help & Support</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <MaterialCommunityIcons name="information-outline" size={24} color="#2196F3" />
          <Text style={styles.infoText}>App Version 1.0.0</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  motivationText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    fontStyle: 'italic',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  categoryStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  categoryStatItem: {
    width: '30%',
    margin: '1.5%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  categoryStatCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  categoryStatLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyStatsText: {
    textAlign: 'center',
    color: '#999',
    width: '100%',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  levelBadge: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '600',
  },
  streakContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  streakText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  logoutButton: {
    padding: 10,
  },
  xpSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  xpLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  xpBarContainer: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpBar: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },
  xpNextLevel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 5,
    textAlign: 'right',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SettingsScreen