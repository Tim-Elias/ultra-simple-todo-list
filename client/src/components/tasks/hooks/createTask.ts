import { ICreateTask } from "@interfaces/createTask.interface";
import { postDataToServer } from "../../../utils/api";
import { useGetTasks } from "./getTasks";
import { useDispatch, useSelector } from "react-redux";
import { setStateEditableTaskSent } from "../../../store/modules/editableTask";
import { IState } from "../../../store/modules";

export const useCreateTask = () => {
  const getTasks = useGetTasks();
  const dispatch = useDispatch();
  const editableTaskText = useSelector(
    (state: IState) => state.editableTask.text
  );
  const editableTaskEmail = useSelector(
    (state: IState) => state.editableTask.user_email
  );
  const editableTaskName = useSelector(
    (state: IState) => state.editableTask.user_name
  );

  const params: ICreateTask = {
    text: editableTaskText,
    user_email: editableTaskEmail,
    user_name: editableTaskName,
  };

  const createTask = async () => {
    try {
      dispatch(setStateEditableTaskSent(true));
      const data = await postDataToServer<number>("tasks", params);
      if (data) {
        getTasks();
      }
      alert("Задача успешно создана");
    } catch {
      alert("Ошибка при создании задачи");
    }
  };

  return createTask;
};
