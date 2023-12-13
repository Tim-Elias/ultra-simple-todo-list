import { ITask } from "@interfaces/task.interface";
import { createSlice } from "@reduxjs/toolkit";

interface ITasksState {
  data: ITask[];
  sortField: string | undefined,
  sortDesc: boolean,
  offset: number,
  total: number,
}


const initialState: ITasksState = {
  data: [],
  sortField: undefined,
  sortDesc: false,
  offset: 0,
  total: 6,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setStateTasksData: (
      state,
      action: { payload: {tasks: ITask[], total: number} }
    ) => {
      state.data = [...action.payload.tasks];
      state.total = action.payload.total;
    },

    setStateSortField: (
      state,
      action: { payload: string }
    ) => {
      state.sortField = action.payload
      
    },
    toggleStateSortDesc: (
      state,
    ) => {
      state.sortDesc = !state.sortDesc
      
    },
    setStateOffset: (
      state,
      action: { payload: number }
    ) => {
      state.offset = action.payload
    }
  },
});

export const { setStateTasksData, setStateSortField, toggleStateSortDesc, setStateOffset } = tasksSlice.actions;

export const tasks = tasksSlice.reducer;
