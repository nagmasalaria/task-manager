import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/tasksSlice';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const AddTaskScreen = () => {
  const [title, setTitle] = useState<any>(null);
  const [description, setDescription] = useState<any>(null);
  const [deadlineDate, setDeadlineDate] = useState<Date>(new Date());
  const [deadline, setDeadline] = useState<string>(
    moment(new Date(deadlineDate)).format('ddd, DD MMMM YYYY'),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (title && deadline) {
      const newTask: any = {
        title,
        description,
        deadline,
        deadlineDate: deadlineDate,
        priority,
        status: 'Pending',
      };

      dispatch(addTask(newTask));
      navigation.goBack();
    } else {
      setDescription('');
      setTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bigHeading}>Add New Task</Text>
      </View>
      <View>
        <KeyboardAvoidingView>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.inputText}
              value={title}
              onChangeText={setTitle}
            />
            {title === '' && (
              <Text style={styles.error}>Title is required.</Text>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.inputText}
              value={description}
              onChangeText={setDescription}
            />
            {description === '' && (
              <Text style={styles.error}>Description is required.</Text>
            )}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Deadline</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.inputText}>{deadline}</Text>
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={showDatePicker}
              date={deadlineDate}
              onConfirm={date => {
                setShowDatePicker(false);
                setDeadlineDate(date);
                setDeadline(moment(new Date(date)).format('ddd, DD MMMM YYYY'));
              }}
              onCancel={() => {
                setShowDatePicker(false);
              }}
            />
          </View>
          <View style={styles.formControl}>
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
          </View>
        </KeyboardAvoidingView>

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
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 8,
  },
  formControl: {
    marginBottom: 25,
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
    marginBottom: 8,
  },
  inputText: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
