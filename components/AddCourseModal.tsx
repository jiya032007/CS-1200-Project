
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddCourseModal = ({ visible, onClose, onAdd }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const handleAdd = () => {
    onAdd({ name: courseName, code: courseCode });
    setCourseName('');
    setCourseCode('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add New Course</Text>
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={courseName}
          onChangeText={setCourseName}
        />
        <TextInput
          style={styles.input}
          placeholder="Course Code"
          value={courseCode}
          onChangeText={setCourseCode}
        />
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Add" onPress={handleAdd} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AddCourseModal;
