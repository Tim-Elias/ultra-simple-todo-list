import { postDataToServer } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/modules";
import { removeStateAuthData } from "../../../store/modules/auth";

export const useLogout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IState) => state.auth.token);

  const logoutFn = async () => {
    try {
      postDataToServer<number>("auth/logout", { token });
    } finally {
      dispatch(removeStateAuthData());
    }
  };

  return logoutFn;
};
