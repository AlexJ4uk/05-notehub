export interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export interface createTaskRequest {
    text: string;
}

export interface updateTaskRequest {
    id: string;
    text?: string;
    completed?: boolean;
}