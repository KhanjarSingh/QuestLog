import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Alert,
  ScrollView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTodoContext, CATEGORIES, PRIORITIES } from '../storage/todos';

const { height } = Dimensions.get('window');

const AddItemModal = ({ visible, onClose, onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('other');
  const [priority, setPriority] = useState('medium');
  const { addTodo } = useTodoContext();

  const handleAddTodo = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your todo');
      return;
    }

    try {
      const result = await addTodo({
        title: title.trim(),
        note: note.trim(),
        category,
        priority
      });
      Alert.alert('Success', result);

      // Reset form
      setTitle('');
      setNote('');
      setCategory('other');
      setPriority('medium');

      // Close modal
      onClose();

      // Call callback if passed
      if (onTodoAdded) {
        onTodoAdded();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create todo. Please try again.');
      console.error('Add todo error:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={28} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Add New Todo</Text>

          <TextInput
            placeholder="Enter the title of the Todo"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Note"
            placeholderTextColor="#888"
            value={note}
            onChangeText={setNote}
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            multiline
          />

          <View style={styles.selectorContainer}>
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
              {Object.values(CATEGORIES).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.chip,
                    category === cat.id && { backgroundColor: cat.color, borderColor: cat.color }
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <MaterialCommunityIcons
                    name={cat.icon}
                    size={16}
                    color={category === cat.id ? 'white' : '#666'}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={[
                    styles.chipText,
                    category === cat.id && { color: 'white' }
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.selectorContainer}>
            <Text style={styles.sectionTitle}>Priority</Text>
            <View style={styles.chipsRow}>
              {Object.values(PRIORITIES).map((prio) => (
                <TouchableOpacity
                  key={prio.id}
                  style={[
                    styles.chip,
                    priority === prio.id && { backgroundColor: prio.color, borderColor: prio.color }
                  ]}
                  onPress={() => setPriority(prio.id)}
                >
                  <Text style={[
                    styles.chipText,
                    priority === prio.id && { color: 'white' }
                  ]}>
                    {prio.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.saveBtnContainer}>
            <Button title="Save Todo" onPress={handleAddTodo} color="#6200ee" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    height: height * 0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    elevation: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveBtnContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectorContainer: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  chipsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default AddItemModal;
