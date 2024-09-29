import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {collection, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore';
import {db} from '../firebaseConfig';

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  deadlineDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskSuccess(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  updateTaskSuccess,
} = tasksSlice.actions;

// Fetch tasks from Firebase
export const fetchTasks = () => async (dispatch: any) => {
  dispatch(fetchTasksStart());
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasks: Task[] = [];
    querySnapshot.forEach(doc => {
      tasks.push({id: doc.id, ...doc.data()} as Task);
    });
    dispatch(fetchTasksSuccess(tasks));
  } catch (error) {
    console.log(error)
    dispatch(fetchTasksFailure('Failed to fetch tasks from Firebase'));
  }
};

// Add task to Firebase
export const addTask = (newTask: Omit<Task, 'id'>) => async (dispatch: any) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), newTask);
    dispatch(addTaskSuccess({id: docRef.id, ...newTask}));
  } catch (error) {
    dispatch(fetchTasksFailure('Failed to add task'));
  }
};

// Update task in Firebase
export const updateTask = (task: any) => async (dispatch: any) => {
  try {
    const taskDocRef = doc(db, 'tasks', task.id);
    await updateDoc(taskDocRef, task);
    dispatch(updateTaskSuccess(task));
  } catch (error) {
    dispatch(fetchTasksFailure('Failed to update task'));
  }
};

export default tasksSlice.reducer;
