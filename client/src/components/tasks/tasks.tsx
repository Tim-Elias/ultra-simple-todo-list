import React, { useEffect, useMemo } from "react";
import { Task } from "../task";
import "./tasks.css";
import { useGetTasks } from "./hooks/getTasks";
import { useDispatch, useSelector } from "react-redux";

import { ITask } from "@interfaces/task.interface";
import { IState } from "../../store/modules";
import { Paginator } from "../paginator";
import { Sort } from "../sort";
import { Login } from "../login";
import { Dialog } from "../dialog";
import { EditableTask } from "../editableTask";
import {
  clearStateEditableTask,
  setStateEditableTaskError,
} from "../../store/modules/editableTask";
import { validateEmail } from "../../utils/validate";
import { useCreateTask } from "./hooks/createTask";

export const Tasks = () => {
  const getTasks = useGetTasks();
  const createTask = useCreateTask();
  const dispatch = useDispatch();

  const tasksData = useSelector((state: IState) => state.tasks.data);
  const sortField = useSelector((state: IState) => state.tasks.sortField);
  const sortDesc = useSelector((state: IState) => state.tasks.sortDesc);
  const offset = useSelector((state: IState) => state.tasks.offset);

  const editableTaskSent = useSelector(
    (state: IState) => state.editableTask.sent
  );

  useEffect(() => {
    getTasks();
  }, [sortField, sortDesc, offset]);

  const editableTaskText = useSelector(
    (state: IState) => state.editableTask.text
  );
  const editableTaskEmail = useSelector(
    (state: IState) => state.editableTask.user_email
  );
  const editableTaskName = useSelector(
    (state: IState) => state.editableTask.user_name
  );

  const handleCreate = async () => {
    const error = {
      text: editableTaskText === "",
      user_email: editableTaskEmail === "" || !validateEmail(editableTaskEmail),
      user_name: editableTaskName === "",
    };

    if (Object.values(error).every((el) => !el)) {
      await createTask();
      dispatch(clearStateEditableTask());
      return true;
    }

    dispatch(setStateEditableTaskError(error));
    return false;
  };

  const tasks = useMemo(
    () => tasksData.map((task: ITask) => <Task key={task.id} task={task} />),
    [tasksData]
  );

  return (
    <div className="tasks">
      <div className="tasks-header">
        <Dialog 
          triggerButtonLabel="Создать"
          header="Создание задачи"
          content={<EditableTask />}
          okButtonLabel="Сохранить"
          okButtondisabled={editableTaskSent}
          onConfirm={handleCreate}
          onCancel={() => {
            dispatch(clearStateEditableTask());
          }}
        />
        <Sort />
      </div>
      {tasks}
      {<Paginator />}
    </div>
  );
};
