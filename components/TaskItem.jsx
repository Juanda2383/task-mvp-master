import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskItem({ task, onDelete, onToggleDone, onToggleFavorite }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleDone} style={styles.checkbox}>
        <View style={[styles.checkboxInner, task.done && styles.checked]} />
      </TouchableOpacity>

      <Text style={[styles.title, task.done && styles.done]}>{task.title}</Text>

      <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
        <Text style={{ fontSize: 18 }}>{task.favorite ? '⭐' : '☆'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  favoriteButton: {
    marginRight: 12,
  },
  deleteButton: {
    padding: 8,
  },
});