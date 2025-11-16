
import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, FlatList } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import AddCourseModal from '../../components/AddCourseModal';

interface Course {
  name: string;
  code: string;
}

export default function CoursesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleAddCourse = (course: Course) => {
    setCourses([...courses, course]);
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
      <FlatList
        data={courses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>{item.name}</Text>
            <Text>{item.code}</Text>
          </View>
        )}
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
  courseItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
