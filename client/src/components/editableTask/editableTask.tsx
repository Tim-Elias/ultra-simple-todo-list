import React from "react";
import "./editableTask.css";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import {
  setStateEditableTaskEmail,
  setStateEditableTaskName,
  setStateEditableTaskText,
} from "../../store/modules/editableTask";

export const EditableTask = () => {
  const dispatch = useDispatch();
  const editableTaskId = useSelector(
    (state: IState) => state.editableTask.id
  );
  const editableTaskText = useSelector(
    (state: IState) => state.editableTask.text
  );
  const editableTaskEmail = useSelector(
    (state: IState) => state.editableTask.user_email
  );
  const editableTaskName = useSelector(
    (state: IState) => state.editableTask.user_name
  );

  const editableTaskErrors = useSelector(
    (state: IState) => state.editableTask.errors
  );
  return (
    <div>
      <div className="editable-task-field">
        Имя пользователя:
        <input
          className="editable-task-input"
          type="text"
          value={editableTaskName}
          onChange={(e) => dispatch(setStateEditableTaskName(e.target.value))}
          readOnly={!!editableTaskId}
        />
        {editableTaskErrors.user_name && (
          <div className="notice-error">
            Имя пользователя обязательно для заполнения
          </div>
        )}
      </div>
      <div className="editable-task-field">
        E-mail:
        <input
          className="editable-task-input"
          type="text"
          value={editableTaskEmail}
          readOnly={!!editableTaskId}
          onChange={(e) => dispatch(setStateEditableTaskEmail(e.target.value))}
        />
        {editableTaskErrors.user_email && (
          <div className="notice-error">
            Необходимо указать корректный e-mail
          </div>
        )}
      </div>
      <div className="editable-task-field">
        Текст задачи:
        <input
          className="editable-task-input"
          type="text"
          value={editableTaskText}
          onChange={(e) => dispatch(setStateEditableTaskText(e.target.value))}
        />
        {editableTaskErrors.text && (
          <div className="notice-error">
            Текст задачи обязателен для заполнения
          </div>
        )}
      </div>
    </div>
  );
};
