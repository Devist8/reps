import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ADD_TASK,
  SET_OPEN,
  SET_ADDOPEN,
  UPDATE_TASKS,
} from '../types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then((res) => {
      authHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      authHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const createTask = (data, history) => (dispatch) => {
  console.log(data);
  const taskData = data;
  dispatch({ type: LOADING_UI });
  axios
    .post('/tasks', data)
    .then((res) => {
      dispatch({ type: ADD_TASK, payload: taskData });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const setTasks = (tasksArr) => (dispatch) => {
  dispatch({ type: UPDATE_TASKS, payload: tasksArr });
};

export const deleteTask = (tasksArr, id) => (dispatch) => {
  dispatch({ type: UPDATE_TASKS, payload: tasksArr });
  axios
    .delete(`/tasks/${id}/delete`)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const completeTask = (tasksArr, id) => (dispatch) => {
  dispatch({ type: UPDATE_TASKS, payload: tasksArr });
  axios
    .post(`/tasks/${id}/complete`)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      const data = {
        ...res.data,
        level: Math.floor(
          (Math.sqrt(100 * (2 * res.data.info.userXP + 25)) + 50) / 100
        ),
      };
      dispatch({
        type: SET_USER,
        payload: data,
      });
    })
    .catch((err) => console.log(err));
};

export const setOpen = () => (dispatch) => {
  dispatch({ type: SET_OPEN });
};

export const setAddOpen = () => (dispatch) => {
  dispatch({ type: SET_ADDOPEN });
};

const authHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
