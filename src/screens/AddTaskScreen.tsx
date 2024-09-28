import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/tasksSlice';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const AddTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (title && deadline) {
      const newTask = {
        title,
        description,
        deadline,
        priority,
        status: 'Pending',
      };

      dispatch(addTask(newTask));
      navigation.goBack();
    } else {
      console.log('Please fill out required fields');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bigHeading}>Add New Task</Text>
      </View>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.inputText}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputText}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Deadline</Text>
        <TouchableOpacity  onPress={() => setShowDatePicker(true)}>
          <Text style={styles.inputText}>{moment(deadline).format('ddd, DD MMMM YYYY')}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={showDatePicker}
          date={deadline}
          onConfirm={date => {
            setShowDatePicker(false);
            setDeadline(date);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.btnGroup}>
          <Button
            color={priority === 'Low' ? 'grey' : '#333'}
            title="Low"
            onPress={() => setPriority('Low')}
          />
          <Button
            color={priority === 'Medium' ? 'grey' : '#333'}
            title="Medium"
            onPress={() => setPriority('Medium')}
          />
          <Button
            color={priority === 'High' ? 'grey' : '#333'}
            title="High"
            onPress={() => setPriority('High')}
          />
        </View>

        <Button color={'slategrey'} title="Submit" onPress={handleSubmit} />
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 30,
  },
});
export default AddTaskScreen;
