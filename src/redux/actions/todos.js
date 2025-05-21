import { ADD_TODO, DELETE_TODO, FILRTER_BY_NAME, FILRTER_BY_STATUS, MARK_ALL_DONE, MARK_TODO } from "../types/todos"

export const addTodo = (name) => {
   return { type: ADD_TODO,
    payload: {name}}
}

export const deleteTodo = (id) => {
    return { type: DELETE_TODO,
     payload: {id}}
}

export const markTodo = (id) => {
    return { type: MARK_TODO,
     payload: {id}}
}

export const markAllTodo = () => {
    return { type: MARK_ALL_DONE}
}

export const filterTodoByStatus = (status) => {
    return { type: FILRTER_BY_STATUS, payload: {status} }
}

export const filterTodoByName = (name) => {
    return { type: FILRTER_BY_NAME, payload: {name}}
}