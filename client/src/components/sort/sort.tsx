import React from "react";
import "./sort.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setStateSortField,
  toggleStateSortDesc,
} from "../../store/modules/tasks";
import { IState } from "../../store/modules";

const sortBase = [
  {
    value: "text",
    label: "по тексту задачи",
  },
  {
    value: "user_email",
    label: "по e-mail",
  },
  {
    value: "user_name",
    label: "по имени пользователя",
  },
];

export const Sort = () => {
  const dispatch = useDispatch();
  const sortField = useSelector((state: IState) => state.tasks.sortField);
  const sortDesc = useSelector((state: IState) => state.tasks.sortDesc);

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStateSortField(e.target.value));
  };

  return (
    <div className="sort">
      <div className="sort-label">Сортировка: </div>
      <select
        className="sort-select"
        value={sortField}
        onChange={handleSortFieldChange}
      >
        {sortBase.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
      <div
        onClick={() => dispatch(toggleStateSortDesc())}
        className="sort-desc"
      >
        {sortDesc ? "↓" : "↑"}
      </div>
    </div>
  );
};
