import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from '../api/client';

export const CATEGORIES = {
  PERSONAL: { id: 'personal', label: 'Personal', color: '#4F46E5', icon: 'account' },
  WORK: { id: 'work', label: 'Work', color: '#0EA5E9', icon: 'briefcase' },
  SHOPPING: { id: 'shopping', label: 'Shopping', color: '#EC4899', icon: 'cart' },
  HEALTH: { id: 'health', label: 'Health', color: '#22C55E', icon: 'heart-pulse' },
  STUDY: { id: 'study', label: 'Study', color: '#F59E0B', icon: 'school' },
  OTHER: { id: 'other', label: 'Other', color: '#94A3B8', icon: 'dots-horizontal' },
};

export const PRIORITIES = {
  HIGH: { id: 'high', label: 'High', color: '#EF4444' },
  MEDIUM: { id: 'medium', label: 'Medium', color: '#F59E0B' },
  LOW: { id: 'low', label: 'Low', color: '#22C55E' },
};

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userData = await api('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        setUser(userData);
        loadTodos(token);
      }
    } catch (e) {
      console.log('Auth check failed', e);
      await AsyncStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      await AsyncStorage.setItem('token', data.token);
      setUser(data.user);
      loadTodos(data.token);
      return { success: true };
    } catch (e) {
      return { error: e.message };
    }
  };

  const signup = async (username, password) => {
    try {
      const data = await api('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      await AsyncStorage.setItem('token', data.token);
      setUser(data.user);
      loadTodos(data.token);
      return { success: true };
    } catch (e) {
      return { error: e.message };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setTodos([]);
  };

  const loadTodos = async (token) => {
    try {
      const authToken = token || await AsyncStorage.getItem('token');
      if (!authToken) return;

      const data = await api('/todos', { headers: { Authorization: `Bearer ${authToken}` } });
      setTodos(data);
    } catch (error) {
      console.error("Load todos error:", error);
    }
  };

  const addTodo = async ({ title, note, time, category, priority }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const newTodo = await api('/todos', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, note, category, priority })
      });
      setTodos([newTodo, ...todos]);
      return "✅ Successfully Created A Todo";
    } catch (error) {
      console.error("AddTodo Error:", error);
      return "❌ Failed To Create A Todo";
    }
  };

  const toggleTodo = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const todo = todos.find(t => t.id === id);
      const data = await api(`/todos/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ completed: !todo.completed })
      });

      setTodos(todos.map(t => t.id === id ? data.todo : t));
      if (data.xp !== user.xp || data.streak !== user.streak || data.rank !== user.rank) {
        setUser({ ...user, xp: data.xp, level: data.level, streak: data.streak, rank: data.rank });
      }
      return data.todo;
    } catch (error) {
      console.error("ToggleTodo Error:", error);
      return null;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await api(`/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(t => t.id !== id));
      return "✅ Todo Deleted Successfully";
    } catch (error) {
      console.error("DeleteTodo Error:", error);
      return "❌ Failed To Delete Todo";
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = await api(`/todos/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates)
      });
      setTodos(todos.map(t => t.id === id ? data.todo : t));
      return "✅ Todo Updated Successfully";
    } catch (error) {
      console.error("UpdateTodo Error:", error);
      return "❌ Failed To Update Todo";
    }
  };

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const stats = {
    total: todos.length,
    completed: completedTodos.length,
    pending: pendingTodos.length,
    completionRate: todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0
  };

  const contextValue = {
    todos,
    pendingTodos,
    completedTodos,
    stats,
    user,
    loading,

    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    refreshTodos: () => loadTodos(null),
    login,
    signup,
    logout,
    CATEGORIES,
    PRIORITIES,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
