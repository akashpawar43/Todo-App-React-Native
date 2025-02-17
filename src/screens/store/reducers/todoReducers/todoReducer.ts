import { Todo } from '../../../newScreens/TodoListScreen';
import *  as types from '../../types/types';

const initialState = {
    todo: [],
    todos: [],
    deleteTodoId: null,
    error: null,
    loading: false,
}

export const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.GET_ALL_TODOS:
            return {
                ...state,
                loading: true,
            }
        case types.GET_ALL_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload
            }
        case types.GET_ALL_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message
            }

        case types.GET_TODO:
            return {
                ...state,
                loading: true,
            }
        case types.GET_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todo: action.payload
            }
        case types.GET_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message
            }

        case types.ADD_TODO:
            return {
                ...state,
                loading: true,
            }
        case types.ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [
                    ...state.todos,
                    action.payload
                ],
            }
        case types.ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message
            }

        case types.UPDATE_TODO:
            return {
                ...state,
                loading: true,
            }
        case types.UPDATE_TODO_SUCCESS:
            const updateTodos = state.todos.map((todo: Todo) =>
                todo._id === action.payload?._id ? { ...todo, ...action.payload } : todo
            )
            const todoExists = updateTodos.some(todo => todo._id === action.payload?._id)
            return {
                ...state,
                loading: false,
                todos: todoExists ? updateTodos : [...updateTodos, action.payload]
            }
        case types.UPDATE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message
            }

        case types.DELETE_TODO:
            return {
                ...state,
                loading: true,
            }
        case types.DELETE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteTodoId: action.payload?._id,
                todos: state?.todos?.filter((todo: Todo) => todo._id != action.payload?._id)
            }
        case types.DELETE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.message
            }

        default:
            return state
    }
}