import { ILoginData } from "@interfaces/loginData.interface";
import { postDataToServer } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/modules";
import {
  IAuthData,
  clearStateLoginData,
  setStateAuthData,
} from "../../../store/modules/auth";

export const useLogin = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: IState) => state.auth.login);
  const password = useSelector((state: IState) => state.auth.password);

  const params: ILoginData = {
    login,
    password,
  };

  const loginFn = async () => {
    try {
      const data = await postDataToServer<IAuthData>("auth/login", params);
      if (data) {
        dispatch(setStateAuthData(data));
      }
      dispatch(clearStateLoginData());
    } catch {
      alert("Неверные Имя пользователя или Пароль");
    }
  };

  return loginFn;
};
