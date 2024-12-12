const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";





export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).send({ message: 'Invalid token' });
  }
  (req as any).user = decoded;
  next();
};
