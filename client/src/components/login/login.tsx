import React from "react";
import { Dialog } from "../dialog";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { setStateAuthLogin, setStateAuthPassword } from "../../store/modules/auth";
import './login.css'

export const Login = ({handleLogin}: {handleLogin: () => boolean}) => {
  
    const dispatch = useDispatch();
    const authLogin = useSelector(
      (state: IState) => state.auth?.login
    );
    const authPassword = useSelector(
      (state: IState) => state.auth.password
    );
   
    const authErrors = useSelector(
      (state: IState) => state.auth.errors
    );
  
    const loginForm = (
    <div>
      <div className="login-field">
        Имя пользователя:
        <input
          className="login-input"
          type="text"
          value={authLogin}
          onChange={(e) => dispatch(setStateAuthLogin(e.target.value))}
        />
        {authErrors?.login && (
          <div className="notice-error">
            Поле обязательно для заполнения
          </div>
        )}
      </div>
      <div className="login-field">
        Пароль:
        <input
          className="login-input"
          type="password"
          value={authPassword}
          onChange={(e) => dispatch(setStateAuthPassword(e.target.value))}
        />
        {authErrors?.password && (
          <div className="notice-error">
             Поле обязательно для заполнения
          </div>
        )}
      </div>
    </div>
  );


  return (
    <Dialog
      triggerButtonLabel="Вход"
      header="Вход в систему"
      content={loginForm}
      okButtonLabel="Войти"
      onConfirm={handleLogin}
    />
  );
};
