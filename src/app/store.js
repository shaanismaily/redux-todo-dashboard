import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import { loadState, saveState } from '../localStorage/localStorage'

const preloadedState = loadState()

export const store = configureStore({
    reducer: {
        todos: todoReducer
    },
    preloadedState
})

store.subscribe(() => {
    saveState({
        todos: store.getState().todos
    })
})
