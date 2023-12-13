import { ITask } from "@interfaces/task.interface";
import { createSlice } from "@reduxjs/toolkit";

interface IEditableTaskState {
  sent: boolean;
  id: string | undefined;
  text: string;
  user_email: string;
  user_name: string;
  errors: {
    text?: boolean;
    user_email?: boolean;
    user_name?: boolean;
  };
}

const initialState: IEditableTaskState = {
  sent: false,
  id: undefined,
  text: "",
  user_email: "",
  user_name: "",
  errors: {},
};

const editableTaskSlice = createSlice({
  name: "editableTask",
  initialState,
  reducers: {
    setStateEditableTaskData: (state, action: { payload: ITask }) => {
      state.id = action.payload.id;
      state.text = action.payload.text;
      state.user_email = action.payload.user_email;
      state.user_name = action.payload.user_name;
    },
    setStateEditableTaskSent: (state, action: { payload: boolean }) => {
      state.sent = action.payload;
    },

    setStateEditableTaskText: (state, action: { payload: string }) => {
      state.text = action.payload;
    },

    setStateEditableTaskEmail: (state, action: { payload: string }) => {
      state.user_email = action.payload;
    },

    setStateEditableTaskName: (state, action: { payload: string }) => {
      state.user_name = action.payload;
    },

    setStateEditableTaskError: (state, action: { payload: IEditableTaskState["errors"] }) => {
        state.errors = action.payload;
      },

    clearStateEditableTask: (state) => {
      state.sent = initialState.sent;
      state.id = initialState.id;
      state.text = initialState.text;
      state.user_email = initialState.user_email;
      state.user_name = initialState.user_name;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setStateEditableTaskData,
  setStateEditableTaskSent,
  setStateEditableTaskText,
  setStateEditableTaskEmail,
  setStateEditableTaskName,
  setStateEditableTaskError,
  clearStateEditableTask,
} = editableTaskSlice.actions;

export const editableTask = editableTaskSlice.reducer;
