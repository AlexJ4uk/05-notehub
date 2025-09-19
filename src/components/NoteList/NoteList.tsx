import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, updateTaskRequest } from "../../types/note";
import css from "./TaskList.module.css";
import { deleteTask, updateTask } from "../../services/noteService";

interface TaskListProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
    const queryClient = useQueryClient();

    const deleteTaskMutation = useMutation({
        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: (newTask: updateTaskRequest) => updateTask(newTask),
        onSuccess: (updatedTask) => {
            queryClient.setQueryData(['tasks'], (prevTasks: Task[]) => {
                return prevTasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                );
            });
            // queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const handleDelete = (taskId: string) => {
        deleteTaskMutation.mutate(taskId);
    };

    const handleChange = (task: Task) => {
        updateTaskMutation.mutate({
            id: task.id,
            completed: !task.completed,
        });
    };

    return (
        <ul className={css.list}>
            {tasks.map((task) => (
                <li key={task.id} className={css.item}>
                    <input
                        type="checkbox"
                        defaultChecked={task.completed}
                        className={css.checkbox}
                        onChange={() => handleChange(task)}
                    />
                    <span className={css.text}>{task.text}</span>
                    <button
                        onClick={() => handleDelete(task.id)}
                        className={css.button}
                        type="button"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}