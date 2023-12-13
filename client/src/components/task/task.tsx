import React from "react";
import { ITask } from "@interfaces/task.interface";
import "./task.css";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { useSetComplited } from "./hooks/setComplited";
import { Dialog } from "../dialog";
import { EditableTask } from "../editableTask";
import { useUpdateTask } from "./hooks/updateTask";
import {
  clearStateEditableTask,
  setStateEditableTaskData,
  setStateEditableTaskError,
} from "../../store/modules/editableTask";

export const Task = ({ task }: { task: ITask }) => {
  const isAuth = useSelector((state: IState) => !!state.auth.token);
  const setCompliter = useSetComplited();
  const updateTask = useUpdateTask();
  const dispatch = useDispatch();

  const handleSetComplited = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCompliter(task.id);
    }
  };

  const editableTaskText = useSelector(
    (state: IState) => state.editableTask.text
  );

  const editableTaskSent = useSelector(
    (state: IState) => state.editableTask.sent
  );

  const editableTaskId = useSelector((state: IState) => state.editableTask.id);

  const handleUpdate = async () => {
    const error = {
      text: editableTaskText === "",
    };

    if (editableTaskId && Object.values(error).every((el) => !el)) {
      await updateTask(editableTaskId);
      dispatch(clearStateEditableTask());
      return true;
    }

    dispatch(setStateEditableTaskError(error));
    return false;
  };

  const complited =
    task.complited || isAuth ? (
      <div className="task-tag">
        Выполнено{" "}
        <input
          type="checkbox"
          checked={task.complited}
          onChange={handleSetComplited}
          readOnly
        />
      </div>
    ) : null;

  const updated =
    task.updated && isAuth ? (
      <div className="task-tag">Отредактировано администратором </div>
    ) : null;

  const updateTaskButton = isAuth ? (
    <Dialog
      triggerButtonLabel="Редактировать"
      header="Редактирование задачи"
      content={<EditableTask />}
      okButtonLabel="Сохранить"
      okButtondisabled={editableTaskSent}
      onOpen={() => dispatch(setStateEditableTaskData(task))}
      onConfirm={handleUpdate}
      onCancel={() => {
        dispatch(clearStateEditableTask());
      }}
    />
  ) : null;

  return (
    <div className="task">
      <div className="task-field">Имя пользователя: {task.user_name}</div>
      <div className="task-field">E-mail: {task.user_email}</div>
      <div className="task-field">Текст задачи: {task.text}</div>
      <div className="task-footer">
        {updateTaskButton}
        {complited}
        {updated}
      </div>
    </div>
  );
};
