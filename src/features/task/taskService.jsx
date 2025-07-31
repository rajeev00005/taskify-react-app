import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'

// Add Task
export const addTaskToFirestore = async (task, userId) => {
  const taskWithUser = { ...task, userId }
  const docRef = await addDoc(collection(db, 'tasks'), taskWithUser)
  return { id: docRef.id, ...taskWithUser }
}

// Get Tasks
export const getTasksFromFirestore = async (userId) => {
  const q = query(collection(db, 'tasks'), where('userId', '==', userId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

// Delete Task
export const deleteTaskFromFirestore = async (taskId) => {
  await deleteDoc(doc(db, 'tasks', taskId))
  return taskId; // Return the taskId
}

// Update Task
export const updateTaskInFirestore = async (taskId, updatedTask) => {
  await updateDoc(doc(db, 'tasks', taskId), updatedTask)
  return { taskId, updatedTask };
}