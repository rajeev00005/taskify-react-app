import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addTaskToFirestore,
  deleteTaskFromFirestore,
  getTasksFromFirestore,
  updateTaskInFirestore,
} from '../../services/firestore';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// ✅ Fetch tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const tasks = await getTasksFromFirestore(userId);
      return tasks || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ task, userId }, { rejectWithValue }) => {
    try {
      const newTask = await addTaskToFirestore(task, userId);
      return newTask;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId, userId }, { rejectWithValue }) => {
    try {
      if (!taskId || !userId) {
        throw new Error('Task ID and User ID are required');
      }
      await deleteTaskFromFirestore(taskId, userId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updatedTask, userId }, { rejectWithValue }) => {
    try {
      if (!taskId || !userId) {
        throw new Error('Task ID and User ID are required');
      }
      await updateTaskInFirestore(taskId, updatedTask, userId);
      return { taskId, updatedTask };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.tasks = [];
      })

      // addTask
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.tasks)) {
          state.tasks = [];
        }
        const exists = state.tasks.some(task => task?.id === action.payload.id);
        if (!exists) {
          state.tasks.push(action.payload);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.tasks)) {
          state.tasks = [];
          return;
        }
        const taskIdToDelete = action.payload;
        if (!taskIdToDelete) return;
        state.tasks = state.tasks.filter((task) => task?.id !== taskIdToDelete);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateTask
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.tasks)) {
          state.tasks = [];
          return;
        }

        const { taskId, updatedTask } = action.payload || {};
        if (!taskId || !updatedTask) return;

        const index = state.tasks.findIndex((task) => task?.id === taskId);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
