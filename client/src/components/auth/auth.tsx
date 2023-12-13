import React from "react";
import { Login } from "../login";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { useLogin } from "./hooks/useLogin";
import { useLogout } from "./hooks/useLogout";
import { setStateAuthErrors } from "../../store/modules/auth";

export const Auth = () => {
  const loginFn = useLogin();
  const logoutFn = useLogout();
  const dispatch = useDispatch();
  const login = useSelector((state: IState) => state.auth.login);
  const password = useSelector((state: IState) => state.auth.password);

  const handleLogin = () => {
    const error = {
      login: login === "",
      password: password === "",
    };

    if (Object.values(error).every((el) => !el)) {
      loginFn();
      return true;
    }

    dispatch(setStateAuthErrors(error));
    return false;
  };

  const isAuth = useSelector((state: IState) => !!state.auth.token);
  const userName = useSelector((state: IState) => state.auth.user?.name);

  const loginButton = <Login handleLogin={handleLogin} />;
  const logoutButton = (
    <button className="button" onClick={logoutFn}>
      Выход ({userName})
    </button>
  );

  return isAuth ? logoutButton : loginButton;
};
