import create from "zustand";
import {generateId} from "../helper";
import {devtools} from "zustand/middleware";

interface Task {
    id: string
    title: string
    createdAt: number
}

interface ToDoStore {
    tasks: Task[]
    createTask: (titleTask: string) => void
    updateTask: (taskId: string, titleTask: string) => void
    deleteTask: (taskId: string) => void
}

export const useToDoStore = create<ToDoStore>(devtools((set, get) => ({
    tasks: [
    //     {
    //     id: 'This Tasksss',
    //     title: 'Title this Taskksss',
    //     createdAt: 1221313
    // }
    ],
    createTask: (titleTask) => {
        const {tasks} = get()
        const newTask: Task = {
            id: generateId(),
            title: titleTask,
            createdAt: Date.now()
        }
        set({tasks: [newTask, ...tasks]})
    },
    updateTask: (taskId, titleTask) => {
        const {tasks} = get()
        set({
            tasks: tasks.map(task => ({
                ...task, title: task.id === taskId ? titleTask : task.title
            }))
        })
    },
    deleteTask: (taskId) => {
        const {tasks} = get()
        set({
            tasks:tasks.filter(task=>task.id !== taskId)
        })
    },
})))
