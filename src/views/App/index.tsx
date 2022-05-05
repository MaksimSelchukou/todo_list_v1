import React, {useEffect} from "react";
import styles from "./index.module.scss"
import {useToDoStore} from "../../data/stores/useToDoStore";
import {InputPlus} from "../components/inputPlus/InputPlus";
import {InputTask} from "../components/inputAddTask/InputTask";


export const App = () => {

    const [tasks, createTask, updateTask, deleteTask] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.deleteTask
    ])

    console.log(tasks)


    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>App TO-DO</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={(title: string) => {
                    if (title) {
                        createTask(title)
                    }
                }}/>
            </section>
            <section className={styles.articleText}>
                {!tasks.length ? 'На текущий момент задачи отсутствуют' : tasks.map(task => (
                    <InputTask key={task.id} id={task.id} title={task.title} onDone={deleteTask} onEdit={updateTask}
                               onRemoved={deleteTask}/>
                ))}
            </section>
        </article>
    )
}