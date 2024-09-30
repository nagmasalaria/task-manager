import React, {act, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  RefreshControl
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasks} from '../redux/tasksSlice';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Loader from '../component/Loader';

const TaskListScreen = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const {tasks, loading, error}: any = useSelector(
    (state: RootState) => state.tasks,
  );
  const [tasksFilter, setTaskFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All Tasks');


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setTaskFiltered(tasks);
  }, [tasks]);

  useEffect(() => {
    setTaskFiltered(
      tasks.filter((task: any) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  useEffect(() => {
    if (activeTab === 'All Tasks') {
      setTaskFiltered(tasks);
      dispatch(fetchTasks())

      
    } else {
      setTaskFiltered(
        tasks.filter(
          (task: any) => getTaskStatus(task.deadlineDate) === activeTab,
        ),
      );
    }
  }, [activeTab]);

  const getTaskStatus = (d: any) => {
    if (d) {
      var a = moment(d.seconds * 1000);
      var b = moment(new Date());
      console.log(a.format('YYYY-MM-DD'));
      console.log(a.diff(b, 'days'));
      return a.diff(b, 'days') > 0 ? 'Pending' : 'Completed';
    }
  };

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
      <Text>{item.priority}</Text>
      <Text style={styles.taskDate}>{item.deadline}</Text>
      <Text style={styles.taskStatus}>
        {item.deadlineDate ? getTaskStatus(item.deadlineDate) : ''}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {}, [activeTab]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Good Morning, Dimitar!</Text>
      <Image
     style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      /></View>

 
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
        {['All Tasks', 'Pending', 'Completed'].map((item, index) => (
          <TouchableOpacity
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            key={index}
            onPress={() => setActiveTab(item)}>
            <Text style={[styles.tabText]}>{item}</Text>
            <View
              style={{
                backgroundColor: activeTab === item ? 'white' : 'transparent',
                width: '100%',
                height: 2,
                marginTop: 6,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
       {activeTab === 'All Tasks' && tasksFilter.length > 0 && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 20,
            backgroundColor:"transparent"
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f5f5f5',
              maxWidth: 120,
              height: 40,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              if (!loading) {
                dispatch(fetchTasks());
              }
            }}>
            {/* <Text
              style={{
                color: 'black',
                fontSize: 18,
              }}>
              Refresh
            </Text> */}
            <Image  style={{height:25,width:20,alignSelf:"center" ,tintColor:'black',}} source={require('../images/refresh.png')} />

          </TouchableOpacity>
        </View>
      )} 
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={tasksFilter}
          renderItem={renderTask}
          keyExtractor={(item: any) => item?.id}
          numColumns={2}
          onScroll={loading}
          // onRefresh={loading}
          // refreshControl={
          //   (<RefreshControl refreshing={loading} onRefresh={fetchTasks} />)
          // }
          columnWrapperStyle={styles.taskListWrapper}
          contentContainerStyle={styles.taskListContainer}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('AddTask')}>
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
    fontSize: 18,
  },
  tinyLogo:{
    height: 60,
    width: 60,
    backgroundColor: 'transparent',
    borderRadius: 100,
    justifyContent:"center",
    alignItems:"center"

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
