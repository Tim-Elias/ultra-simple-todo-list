import { ITask } from "@interfaces/task.interface";
import { IGetTasks } from "@interfaces/getTasks.interface";
import { getDataFromServer } from "../../../utils/api";
import { setStateTasksData } from "../../../store/modules/tasks";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/modules";

export const useGetTasks = () => {
  const dispatch = useDispatch();
  const sortField = useSelector((state: IState) => state.tasks.sortField);
  const sortDesc = useSelector((state: IState) => state.tasks.sortDesc);
  const offset = useSelector((state: IState) => state.tasks.offset);

  const params: IGetTasks = { offset, sortField };
  if (sortDesc) {
    params.sortDesc = true;
  }

  const getTasks = async () => {
    const data = await getDataFromServer<{ tasks: ITask[]; total: number }>(
      "tasks",
      params as Record<string, string | number | boolean>
    );
    dispatch(setStateTasksData(data));
  };
  return getTasks;
};
