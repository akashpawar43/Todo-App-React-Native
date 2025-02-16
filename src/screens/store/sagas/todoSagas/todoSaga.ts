import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/types';
import { addTodoReq, deleteTodoReq, fetchSingleTodoReq, fetchTodosReq, updateTodoReq } from '../../services/api';

function* fetchTodos() {
    try {
        const todos = yield call(fetchTodosReq);
        // if (todos.ok) {
        // } else {
        // }
        yield put({ type: types.GET_ALL_TODOS_SUCCESS, payload: todos })
    } catch (error) {
        yield put({ type: types.GET_ALL_TODOS_FAILURE, message: error.message || "An unexpected error occurred" })
    }
}

function* fetchSingleTodo(action: any) {
    try {
        const todos = yield call(fetchSingleTodoReq, action);
        yield put({ type: types.GET_TODO_SUCCESS, payload: todos })
    } catch (error) {
        yield put({ type: types.GET_TODO_FAILURE, message: error.message || "An unexpected error occurred" })
    }
}

function* addTodo(action: any) {
    try {
        const todos = yield call(addTodoReq, action);
        yield put({ type: types.ADD_TODO_SUCCESS, payload: todos })
    } catch (error) {
        yield put({ type: types.ADD_TODO_FAILURE, message: error.message || "An unexpected error occurred" })
    }
}

function* updateTodo(action: any) {
    try {
        const todos = yield call(updateTodoReq, action);
        yield put({ type: types.UPDATE_TODO_SUCCESS, payload: todos })
    } catch (error) {
        yield put({ type: types.UPDATE_TODO_FAILURE, message: error.message || "An unexpected error occurred" })
    }
}

function* deleteTodo(action: any) {
    try {
        console.log("inside delete")
        const todo = yield call(deleteTodoReq, action);
        console.log("delete:", todo)
        yield put({ type: types.DELETE_TODO_SUCCESS, payload: todo })
    } catch (error) {
        yield put({ type: types.DELETE_TODO_FAILURE, message: error.message || "An unexpected error occurred" })
    }
}

export function* todoSaga() {
    yield takeLatest(types.GET_ALL_TODOS, fetchTodos);
    yield takeLatest(types.GET_TODO, fetchSingleTodo);
    yield takeLatest(types.ADD_TODO, addTodo);
    yield takeLatest(types.UPDATE_TODO, updateTodo);
    yield takeLatest(types.DELETE_TODO, deleteTodo);
}