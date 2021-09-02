import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = (
  req = Request,
  res = Response,
  next = NextFunction
) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error("missing header token");
    }
    const payload = jwt.verify(token, "hdusiwkowlppqndsuwjwiuueosnka");
    req.session = { userId: payload.userId, email: payload.email };
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};
