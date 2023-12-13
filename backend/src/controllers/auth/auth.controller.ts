import { RequestHandler } from "express";
import { pool } from "../../config";
import { ILoginData } from "@interfaces/loginData.interface";
import { IUser } from "@interfaces/user.interface";
import { IToken } from "@interfaces/token.interface";
import { randomUUID } from "crypto";

export const login: RequestHandler = async (req, res, next) => {
  const { login, password }: ILoginData = req.body;

  try {
    const query = `SELECT * FROM users WHERE login=$1 AND password=$2 ;`;
    const result = await pool.query<IUser>(query, [login, password]);
    if (result.rowCount == 0) return res.status(404).send("No user exists");

    const tokenId = randomUUID();
    const user = result.rows[0];
    await pool.query<IToken>(
      "INSERT INTO tokens (token, user_id)  VALUES($1, $2) RETURNING *;",
      [tokenId, user.id]
    );

    return res.status(200).json({
      status: 201,
      data: { token: tokenId, user: { name: user.name, id: user.id } },
    });
  } catch (error) {
    return next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  const token: string = req.body.token;

  if (!token) {
    return res.status(403).send("invalid token");
  }
  try {
    const result = await pool.query<IToken>("DELETE FROM tokens WHERE token=$1 RETURNING *;", [token]);

    if (result.rowCount == 0) return res.status(403).send("invalid token");

    return res.status(200).json({
      status: 201,
      data: true,
    });
  } catch (error) {
    return next(error);
  }
};
