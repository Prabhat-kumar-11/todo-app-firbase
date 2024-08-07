import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO, FETCH_TODOS } from './actionTypes';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';

export const addTodo = (todo) => async (dispatch) => {
  try {
    if (!todo.userId) {
      throw new Error('User ID is required to add a todo');
    }
    
    const docRef = await addDoc(collection(db, 'todos'), todo);
    dispatch({ type: ADD_TODO, payload: { ...todo, id: docRef.id } });
  } catch (error) {
    console.error('Error adding todo: ', error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'todos', id));
    dispatch({ type: DELETE_TODO, payload: id });
  } catch (error) {
    console.error('Error deleting todo: ', error);
  }
};

export const toggleTodo = (id, completed) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'todos', id), { completed });
    dispatch({ type: TOGGLE_TODO, payload: { id, completed } });
  } catch (error) {
    console.error('Error toggling todo: ', error);
  }
};

export const editTodo = (id, updatedTodo) => async (dispatch) => {
  try {
    await updateDoc(doc(db, 'todos', id), updatedTodo);
    dispatch({ type: EDIT_TODO, payload: { id, updatedTodo } });
  } catch (error) {
    console.error('Error editing todo: ', error);
  }
};

export const fetchTodos = (userId) => async (dispatch) => {
  if (!userId) {
    console.error('User ID is missing');
    return;
  }

  try {
    const q = query(collection(db, 'todos'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: FETCH_TODOS, payload: todos });
  } catch (error) {
    console.error('Error fetching todos: ', error);
  }
};
