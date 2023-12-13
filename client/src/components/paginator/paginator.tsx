import React, { useMemo } from "react";
import "./paginator.css";
import { useDispatch, useSelector } from "react-redux";
import { setStateOffset } from "../../store/modules/tasks";
import { IState } from "../../store/modules";

export const Paginator = () => {
  const dispatch = useDispatch();
  const offset = useSelector((state: IState) => state.tasks.offset);
  const total = useSelector((state: IState) => state.tasks.total);

  const pages = useMemo(
    () => Array.from({ length: Math.ceil(total / 3) }, (_, i) => i + 1),
    [total]
  );

  return (
    <div className="paginator">
      {pages.map((page) => {
        const className = `paginator-page ${
          page === offset / 3 + 1 ? "paginator-page-active" : ""
        }`;

        const handleOnClick = () => {
          dispatch(setStateOffset((page - 1) * 3));
        };

        return (
          <div key={page} className={className} onClick={handleOnClick}>
            {page}
          </div>
        );
      })}
    </div>
  );
};
