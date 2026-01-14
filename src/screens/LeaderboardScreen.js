import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../api/client';
import { useTodoContext } from '../storage/todos';

const LeaderboardScreen = () => {
    const [leaders, setLeaders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useTodoContext();

    const fetchLeaderboard = async () => {
        try {
            const data = await api('/leaderboard');
            setLeaders(data);
        } catch (e) {
            console.error(e);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchLeaderboard();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const renderItem = ({ item, index }) => {
        const isMe = item.id === user?.id;
        return (
            <View style={[styles.item, isMe && styles.myRank]}>
                <View style={styles.rankContainer}>
                    {index < 3 ? (
                        <MaterialCommunityIcons
                            name="trophy"
                            size={24}
                            color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}
                        />
                    ) : (
                        <Text style={styles.rankText}>#{index + 1}</Text>
                    )}
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.username, isMe && styles.myText]}>{item.username}</Text>
                    <Text style={styles.levelText}>Lvl {item.level}</Text>
                </View>
                <View style={styles.xpContainer}>
                    <Text style={[styles.xpText, isMe && styles.myText]}>{item.xp} XP</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🏆 Hall of Heroes</Text>
            </View>
            <FlatList
                data={leaders}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    list: {
        padding: 15,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    myRank: {
        backgroundColor: '#EEF2FF',
        borderColor: '#4F46E5',
        borderWidth: 1,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
    },
    rankText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#64748B',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    levelText: {
        fontSize: 12,
        color: '#94A3B8',
    },
    myText: {
        color: '#4F46E5',
        fontWeight: 'bold',
    },
    xpContainer: {
        paddingHorizontal: 10,
    },
    xpText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#64748B',
    },
});

export default LeaderboardScreen;
