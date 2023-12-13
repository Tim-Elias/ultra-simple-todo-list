import React from "react";
import { Login } from "../login";
import { useSelector } from "react-redux";
import { IState } from "../../store/modules";
import { useLogin } from "./hooks/useLogin";
import { useLogout } from "./hooks/useLogout";


export const Auth = () => {

    const loginFn = useLogin()
    const logoutFn = useLogout()
    const handleLogin = () => {
        loginFn()
        return true
    }

    const isAuth = useSelector((state: IState) => !!state.auth.token)
    const userName = useSelector((state: IState) => state.auth.user?.name)

    const login = <Login handleLogin={handleLogin} />
    const logout = <button className="button" onClick={logoutFn}>Выход ({userName})</button>

    return isAuth ? logout : login
}