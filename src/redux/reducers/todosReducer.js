import { ADD_TODO, DELETE_TODO, FILRTER_BY_NAME, FILRTER_BY_STATUS, MARK_ALL_DONE, MARK_TODO } from "../types/todos"
import { v4 as uuidv4 } from 'uuid';

const initiaState = {
    todos: [],
    status: 'all',
    search: ''
}

const todosReducer = (state = initiaState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return { ...state, todos:[...state.todos, {id: uuidv4(), name: action.payload.name, isDone: false}]}
        }
        case DELETE_TODO: {
            return {
                ...state,
                todos: state.todos.filter((item) => item.id !== action.payload.id),
              };
        }
        case MARK_TODO: {
            return {
                ...state,
                todos: state.todos.map((item) =>
                  item.id === action.payload.id
                    ? { ...item, isDone: !item.isDone }
                    : item
                ),
              };
        }
        case MARK_ALL_DONE: {
            return {
                ...state,
                todos: state.todos.map((item) => ({ ...item, isDone: true })),
              };
        }
        case FILRTER_BY_STATUS: {
            return {...state, status: action.payload.status}
        }
        case FILRTER_BY_NAME: {
            return {...state, search: action.payload.name}
        }
        default:
            return state
    }
}

export default todosReducer