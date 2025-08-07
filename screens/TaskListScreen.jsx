// screens/TaskListScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from '../components/TaskItem';

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await AsyncStorage.getItem('TASKS');
      if (tasksData) setTasks(JSON.parse(tasksData));
    } catch (error) {
      console.log('Error al cargar llamada', error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('TASKS', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.log('Error al guardar llamada', error);
    }
  };

  const deleteTask = (id) => {
    const filtered = tasks.filter(task => task.id !== id);
    saveTasks(filtered);
  };

  const toggleTaskDone = (id) => {
    const updated = tasks.map(task => {
      if (task.id === id) return { ...task, done: !task.done };
      return task;
    });
    saveTasks(updated);
  };

  const toggleFavorite = (id) => {
    const updated = tasks.map(task => {
      if (task.id === id) return { ...task, favorite: !task.favorite };
      return task;
    });
    saveTasks(updated);
  };

  // Filtrar por favoritos si está activo
  const filteredTasks = showFavorites ? tasks.filter(t => t.favorite) : tasks;

  // Ordenar tareas: las no hechas primero
  const sortedTasks = [...filteredTasks].sort((a, b) => a.done - b.done);

  return (
    <View style={styles.container}>
      <Button title="Agregar llamada" onPress={() => navigation.navigate('AddTask', { onAdd: loadTasks })} />
      
      <View style={{ marginVertical: 10 }}>
        <Button
          title={showFavorites ? "Mostrar todas las llamadas" : "Mostrar llamadas favoritas"}
          onPress={() => setShowFavorites(!showFavorites)}
        />
      </View>

      {tasks.length === 0 ? (
        <Text style={{ marginTop: 20, fontSize: 18 }}>No hay llamadas, agrega una.</Text>
      ) : (
        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => deleteTask(item.id)}
              onToggleDone={() => toggleTaskDone(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});