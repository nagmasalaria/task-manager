// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux'; // Import Provider
import {store} from './src/redux/store'; // Import the Redux store
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="TaskList"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TaskList" component={TaskListScreen} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
