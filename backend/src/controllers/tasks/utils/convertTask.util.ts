import { ITask } from "@interfaces/task.interface";

export const convertTask = (data: ITask ): ITask => ({
    id: data.id,
    text: data.text,
    user_name: data.user_name,
    user_email: data.user_email,
    complited: data.complited,
    updated: data.updated
}) 