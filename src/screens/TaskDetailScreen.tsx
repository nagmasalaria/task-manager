import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import moment from 'moment';

const TaskDetailScreen = ({
  route,
}: {
  route: RouteProp<{params: {task: any}}, 'params'>;
}) => {
  const {task} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bigHeading}>Task Details</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.value}>Title: {task.title}</Text>
        <Text style={styles.value}>Description: {task.description}</Text>
        <Text style={styles.value}>Deadline: {moment(new Date(task.deadline)).format('ddd, DD MMMM YYYY')}</Text>
        <Text style={styles.value}>Priority: {task.priority}</Text>
        <Text style={styles.value}>Status: {task.status}</Text>
      </View>
      <View style={styles.btnGroup}>
        <Button
          onPress={() => navigation.navigate('TaskList')}
          color={'#333'}
          title="Back"
        />
        <Button
          onPress={() => navigation.navigate('AddTask')}
          color={'#333'}
          title="Add Task"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
  },
  value: {
    color: '#f5f5f5',
    fontSize: 16,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bigHeading: {
    maxWidth: 250,
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
  },
  inputText: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    color: 'white',
  },
  priorityBtn: {
    backgroundColor: '#000',
  },
  priorityBtnActive: {
    backgroundColor: 'darkblue',
  },
  btnGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 30,
  },
});

export default TaskDetailScreen;
