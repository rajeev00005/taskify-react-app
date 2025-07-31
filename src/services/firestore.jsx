import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// Get tasks
export const getTasksFromFirestore = async (userId) => {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const querySnapshot = await getDocs(tasksRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add task
export const addTaskToFirestore = async (task, userId) => {
  const tasksRef = collection(db, 'users', userId, 'tasks');
  const docRef = await addDoc(tasksRef, task);
  return { id: docRef.id, ...task };
};

// Delete task
export const deleteTaskFromFirestore = async (taskId, userId) => {
 const taskRef = doc(db, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskRef);
};

// Update task
export const updateTaskInFirestore = async (taskId, updatedTask, userId) => {
  const taskDoc = doc(db, 'users', userId, 'tasks', taskId);
  await updateDoc(taskDoc, updatedTask);
};
