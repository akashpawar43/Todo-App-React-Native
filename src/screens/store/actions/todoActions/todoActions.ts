import * as types from '../../types/types'

export const fetchTodos = () => ({
    type: types.GET_ALL_TODOS
})

export const fetchSingleTodo = (id: string) => ({
    type: types.GET_TODO,
    payload: id,
})

export const addTodo = (todo: any) => ({
    type: types.ADD_TODO,
    payload: todo
})

export const updateTodo = (todo: any) => ({
    type: types.UPDATE_TODO,
    payload: todo
})

export const deleteTodo = (id: string) => ({
    type: types.DELETE_TODO,
    payload: id
})