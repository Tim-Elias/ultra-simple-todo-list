import { RequestHandler } from "express";
import { pool } from "../../config";
import { IGetTasks } from "@interfaces/getTasks.interface";
import { ITask } from "@interfaces/task.interface";
import { convertTask } from "./utils/convertTask.util";
import { ICreateTask } from "@interfaces/createTask.interface";
import { randomUUID } from "crypto";
import { IUpdateTask } from "@interfaces/updateTask.interface";
import { IToken } from "@interfaces/token.interface";

const sortBase: Record<string, string> = {
  text: "text",
  user_email: "user_email",
  user_name: "user_name",
};

export const getTasks: RequestHandler = async (req, res, next) => {
  const { sortField, sortDesc, offset }: IGetTasks = req.query;

  try {
    const query = `SELECT * FROM tasks ORDER BY ${
      sortField && sortBase[sortField] ? sortBase[sortField] : "id"
    }${sortDesc ? " DESC" : ""} LIMIT 3 OFFSET $1;`;

    const result = await pool.query<ITask>(query, [offset]);
    if (result.rowCount == 0) return res.status(404).send("No tasks exists");

    const tasks: ITask[] = result.rows.map((task) => {
      return convertTask(task);
    });

    const total: number = (
      await pool.query("SELECT count(*) AS total FROM tasks")
    ).rows[0].total;

    return res.status(200).json({
      status: 200,
      data: { tasks, total },
    });
  } catch (error) {
    return next(error);
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  const { text, user_name, user_email }: ICreateTask = req.body;

  if (!text)
    return res.status(400).send("text is required and cannot be empty");
  if (!user_name)
    return res.status(400).send("user_name is required and cannot be empty");
  if (!user_email)
    return res.status(400).send("user_email is required and cannot be empty");

  const id = randomUUID();
  const query =
    "INSERT INTO tasks (id, text, user_name, user_email, updated, complited)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *;";
  const values = [id, text, user_name, user_email, false, false];
  try {
    const result = await pool.query<ITask>(query, values);
    const task = convertTask(result.rows[0]);
    return res.status(201).json({
      status: 201,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateTask: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const { token, text, complited }: IUpdateTask = req.body;

  if (!text && !complited) {
    return res.status(400).send("some parameter must be non-empty");
  }

  const tokens = await pool.query<IToken>(
    "SELECT * FROM tokens WHERE token=$1;",
    [token]
  );
  if (tokens.rowCount == 0) return res.status(403).send("Invalid token");

  const { id } = req.params;
  const queryData = [];
  const values: Array<string | boolean> = [id];
  if (text) {
    queryData.push("updated=true");
    queryData.push(`text=$2`);
    values.push(text);
  }
  if (complited !== undefined) {
    queryData.push(`complited=$${values.length + 1}`);
    values.push(complited);
  }

  const query = `UPDATE tasks SET ${queryData.toString()} WHERE id=$1 RETURNING *;`;

  try {
    const result = await pool.query<ITask>(query, values);

    if (result.rowCount == 0)
      return res.status(404).send("Task does not exist");
    const task = convertTask(result.rows[0]);

    return res.status(200).json({
      status: 200,
      data: task,
    });
  } catch (error) {
    return next(error);
  }
};
