import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/types';
import { addTodoReq, deleteTodoReq, fetchSingleTodoReq, fetchTodosReq, updateTodoReq } from '../../services/api';
import Toast from 'react-native-toast-message';
import { Todo } from '../../../newScreens/TodoListScreen';

function* fetchTodos() {
    try {
        const todos: Todo[] = yield call(fetchTodosReq);
        yield put({ type: types.GET_ALL_TODOS_SUCCESS, payload: todos })
    } catch (error) {
        const errMsg = error instanceof Error && error.message
        yield put({ type: types.GET_ALL_TODOS_FAILURE, message: errMsg || "An unexpected error occurred" })
    }
}

function* fetchSingleTodo(action: any) {
    try {
        const todos: Todo = yield call(fetchSingleTodoReq, action);
        yield put({ type: types.GET_TODO_SUCCESS, payload: todos })
    } catch (error) {
        const errMsg = error instanceof Error && error.message
        yield put({ type: types.GET_TODO_FAILURE, message: errMsg || "An unexpected error occurred" })
    }
}

function* addTodo(action: any) {
    try {
        const todos: Todo = yield call(addTodoReq, action.payload);
        yield put({ type: types.ADD_TODO_SUCCESS, payload: todos })
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Todo Added Successfully",
        });
    } catch (error) {
        console.log("error", error)
        const errMsg = error instanceof Error && error.message
        yield put({ type: types.ADD_TODO_FAILURE, message: errMsg || "An unexpected error occurred" })
        Toast.show({
            type: 'error',
            text1: 'Required Fields',
            text2: errMsg || "Failed to add todo",
            // text2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A inventore voluptas debitis! Dicta recusandae cum suscipit nulla iure dignissimos eos deleniti nemo eaque!",
            props: {
                text2NumberOfLines: 5,
            }
        })
    }
}

function* updateTodo(action: any) {
    try {
        const todos: Todo = yield call(updateTodoReq, action.payload);
        yield put({ type: types.UPDATE_TODO_SUCCESS, payload: todos })
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Todo Updated Successfully",
        });
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Failed to update todo!"
        yield put({ type: types.UPDATE_TODO_FAILURE, message: errMsg  })
        Toast.show({
            type: "error",
            text1: "Error",
            text2: errMsg,
        });
    }
}

function* deleteTodo(action: any) {
    try {
        const todo: Todo = yield call(deleteTodoReq, action);
        yield put({ type: types.DELETE_TODO_SUCCESS, payload: todo })
        Toast.show({
            type: "success",
            text1: "Success",
            text2: "Todo Deleted Successfully",
        });
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Failed to delete todo!"
        yield put({ type: types.DELETE_TODO_FAILURE, message: errMsg })
        Toast.show({
            type: "error",
            text1: "Error",
            text2: errMsg,
        });
    }
}

export function* todoSaga() {
    yield takeLatest(types.GET_ALL_TODOS, fetchTodos);
    yield takeLatest(types.GET_TODO, fetchSingleTodo);
    yield takeLatest(types.ADD_TODO, addTodo);
    yield takeLatest(types.UPDATE_TODO, updateTodo);
    yield takeLatest(types.DELETE_TODO, deleteTodo);
}