import { combineReducers } from "redux";
import { auth } from "./auth";
import { tasks } from "./tasks";
import { editableTask } from "./editableTask";

export const rootReducer = combineReducers({
  auth,
  tasks,
  editableTask,
});

export type IState = ReturnType<typeof rootReducer>;
