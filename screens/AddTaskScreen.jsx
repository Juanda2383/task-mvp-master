// screens/AddTaskScreen.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTaskScreen({ navigation, route }) {
  const [title, setTitle] = useState('');

  const addTask = async () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'El título no puede estar vacío');
      return;
    }

    try {
      const tasksData = await AsyncStorage.getItem('TASKS');
      const tasks = tasksData ? JSON.parse(tasksData) : [];

      const newTask = {
      id: Date.now(),
      title,
      done: false,
      favorite: false, // Aquí la propiedad nueva
  };

      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem('TASKS', JSON.stringify(updatedTasks));

      // Si viene una función para recargar tareas, se llama
      if (route.params?.onAdd) {
        route.params.onAdd();
      }

      navigation.goBack();
    } catch (error) {
      console.log('Error al guardar la tarea', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título de la tarea"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Guardar" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
});