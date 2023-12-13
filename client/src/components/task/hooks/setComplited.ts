import { IUpdateTask } from "@interfaces/updateTask.interface";
import { postDataToServer } from "../../../utils/api";
import { useSelector } from "react-redux";
import { IState } from "../../../store/modules";
import { useGetTasks } from "../../tasks/hooks/getTasks";
import { useLogout } from "../../auth/hooks/useLogout";

export const useSetComplited = () => {
  const getTasks = useGetTasks();
  const logoutFn = useLogout();
  const token = useSelector((state: IState) => state.auth.token);

  const setComplited = async (id: string) => {
    if (!token) {
      alert("Ошибка авторизации");
      return;
    }

    const params: IUpdateTask = {
      token,
      complited: true,
    };

    try {
      const data = await postDataToServer<number>(`tasks/${id}`, params);

      if (data) {
        getTasks();
      }
    } catch {
      logoutFn()
      alert("Ошибка при изменении задачи");
    }
  };

  return setComplited;
};
