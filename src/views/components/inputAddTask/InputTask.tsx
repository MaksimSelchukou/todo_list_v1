import React, {useCallback, useState} from "react";
import styles from "./InputTask.module.scss"

interface InputTaskProps {
    id: string
    title: string
    onDone: (id: string) => void
    onEdit: (id: string, title: string) => void
    onRemoved: (id: string) => void
}

export const InputTask = ({id, title, onDone, onEdit, onRemoved, ...props}: InputTaskProps) => {
    const [checked, setChecked] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [valueInput, setValueInput] = useState(title)
    const [focus, setFocus] = useState(false)

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input type="checkbox"
                       disabled={editMode}
                       checked={checked}
                       className={styles.inputTaskCheckbox}
                       onChange={(event) => {
                           setChecked(!checked)
                           onRemoved(id)
                       }}
                />
                {editMode ? <input
                    value={valueInput}
                    onChange={(event) => {
                        setValueInput(event.currentTarget.value)
                    }}
                    className={styles.inputTaskEditTitle}
                    autoFocus
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            onEdit(id, valueInput)
                            setEditMode(false)
                        }
                    }

                    }
                /> : (<h3 className={styles.inputTaskTitle}>{title}</h3>)}

            </label>
            {editMode ? (<button
                aria-label="Check"
                className={styles.inputTaskCheck}
                onClick={() => {
                    onEdit(id, valueInput)
                    setEditMode(false)
                }}
            />) : <button
                aria-label="Edit"
                className={styles.inputTaskEdit}
                onClick={() => {
                    setEditMode(true)
                }}
            />}

            <button
                aria-label="Remove"
                className={styles.inputTaskRemove}
                onClick={() => {
                    if (confirm('Вы уверены что хотите удалить?')) {
                        onRemoved(id)
                    }
                }}
            />
        </div>
    )
}