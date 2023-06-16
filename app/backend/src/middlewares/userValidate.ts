import { NextFunction, Request, Response } from 'express';
import TokenGeneratorJwt from '../auth/TokenGeneratorJwt';
import loginUserSchemas from '../Joi/userShemas';

export default class UserValidate {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const { error } = loginUserSchemas.validate({ email, password });
    if (error?.details[0].type === 'string.min') {
      return res.status(401).json({ message: error.message });
    }
    if (error?.details[0].type === 'string.email') {
      return res.status(401).json({ message: error.message });
    }
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  }

  static validateJWT(req: Request, res: Response, next: NextFunction):
  Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validToken = TokenGeneratorJwt.verify(token);
    if (!validToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
