import React, {useCallback, useState} from "react";
import styles from "./InputPlus.module.scss"

interface InputPlusProps {
    onAdd: (title: string) => void
}

export const InputPlus = ({onAdd, ...props}: InputPlusProps) => {
    const [inpValue, setInpValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inpValue);
        setInpValue('')
    }, [inpValue])

    return (
        <div className={styles.inputPlus}>
            <input
                className={styles.inputPlusValue}
                type="text"
                placeholder={'Name task'}
                value={inpValue}
                onChange={(e) => setInpValue(e.currentTarget.value)}
                onKeyDown={(event => {
                    if (event.key === 'Enter') {
                        addTask()
                    }
                    // setInpValue(event.currentTarget.value)
                })}
            />
            <button
                className={styles.inputPlusButton}
                onClick={() => {
                    addTask()
                }}
                aria-label="Add"
            />
        </div>
    )
}