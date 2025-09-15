
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

const getTodosFromStorage = async () => {
  try {
    const result = await AsyncStorage.getItem("todos");
    return result ? JSON.parse(result) : [];
  } catch (error) {
    console.error("Get todos error:", error);
    return [];
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const todosFromStorage = await getTodosFromStorage();
      setTodos(todosFromStorage);
    } catch (error) {
      console.error("Load todos error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTodosToStorage = async (todosToSave) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todosToSave));
      return true;
    } catch (error) {
      console.error("Save todos error:", error);
      return false;
    }
  };

  const addTodo = async ({ title, note, time }) => {
    try {
      const newTodo = {
        id: uuidv4(),
        title,
        note,
        time: time || new Date().toLocaleDateString(),
        completed: false,
      };
      
      const updatedTodos = [...todos, newTodo];
      const saved = await saveTodosToStorage(updatedTodos);
      
      if (saved) {
        setTodos(updatedTodos);
        return "✅ Successfully Created A Todo";
      } else {
        return "❌ Failed To Create A Todo";
      }
    } catch (error) {
      console.error("AddTodo Error:", error);
      return "❌ Failed To Create A Todo";
    }
  };

  const toggleTodo = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      
      const saved = await saveTodosToStorage(updatedTodos);
      
      if (saved) {
        setTodos(updatedTodos);
        return updatedTodos;
      } else {
        console.error("Failed to save updated todos");
        return null;
      }
    } catch (error) {
      console.error("ToggleTodo Error:", error);
      return null;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      const saved = await saveTodosToStorage(updatedTodos);
      
      if (saved) {
        setTodos(updatedTodos);
        return "✅ Todo Deleted Successfully";
      } else {
        return "❌ Failed To Delete Todo";
      }
    } catch (error) {
      console.error("DeleteTodo Error:", error);
      return "❌ Failed To Delete Todo";
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      
      const saved = await saveTodosToStorage(updatedTodos);
      
      if (saved) {
        setTodos(updatedTodos);
        return "✅ Todo Updated Successfully";
      } else {
        return "❌ Failed To Update Todo";
      }
    } catch (error) {
      console.error("UpdateTodo Error:", error);
      return "❌ Failed To Update Todo";
    }
  };


  const allTodos = todos;
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const stats = {
    total: todos.length,
    completed: completedTodos.length,
    pending: pendingTodos.length,
    completionRate: todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0
  };

  const contextValue = {
    todos: allTodos,
    pendingTodos,
    completedTodos,
    stats,

    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    refreshTodos: loadTodos, 
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
