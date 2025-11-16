
import React, { useState } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import AddCourseModal from '../../components/AddCourseModal';

export default function CoursesScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCourse = (course) => {
    // Here you would typically handle adding the course to your state or database
    console.log('New course added:', course);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Courses</ThemedText>
      <Button title="Add Course" onPress={() => setModalVisible(true)} />
      <AddCourseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddCourse}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
