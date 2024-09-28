import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks} from '../redux/tasksSlice';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const TaskListScreen = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const {tasks, loading, error} = useSelector(
    (state: RootState) => state.tasks,
  );
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const getTaskStatus = (d : any) => {
    var a = moment(new Date(d));
    var b = moment(new Date());
    return a.diff(b, 'days') > 1 ? 'Pending' : 'Completed';
  }

  const renderTask = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.taskCard,
        {
          backgroundColor:
            item.priority === 'High'
              ? '#E9F542'
              : item.priority === 'Medium'
              ? '#DADFE4'
              : '#fff',
        },
      ]}
      onPress={() => navigation.navigate('TaskDetail', {task: item})}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>{getTaskStatus(item.deadline)}</Text>
      <Text style={styles.taskStatus}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Good Morning, Dimitar!</Text>
        <View
          style={{
            height: 60,
            width: 60,
            backgroundColor: 'white',
            borderRadius: 100,
          }}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Text style={styles.tabTextActive}>All Tasks</Text>
        <Text style={styles.tabText}>Pending</Text>
        <Text style={styles.tabText}>Completed</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.taskListWrapper}
        contentContainerStyle={styles.taskListContainer}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.navButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  greetingText: {
    maxWidth: 250,
    fontSize: 32,
    color: '#fff',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabText: {
    color: '#aaa',
    fontSize: 22,
  },
  tabTextActive: {
    color: '#fff',
    fontSize: 22,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  taskListWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskListContainer: {
    paddingBottom: 100,
  },
  taskCard: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  taskDate: {
    fontSize: 12,
    color: '#666',
  },
  taskStatus: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#1b1b1b',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    height: 60,
    width: 60,
    textAlign: 'center',
    borderRadius: 100,
    backgroundColor: '#444',
  },
});

export default TaskListScreen;
