import { Router } from 'express';
import UserService from '../services/UserService';
import UsersController from '../controllers/UserController';
import UserModel from '../models/UserModel';
import EncrypterBcryptService from '../auth/EncrypterBcryptService';
import UserValidate from '../middlewares/userValidate';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const userService = new UserService(userModel, encrypter);
const userController = new UsersController(userService);

const user = Router();

user.post('/', UserValidate.validateLogin, (req, res) => userController.login(req, res));
user.get(
  '/role',
  UserValidate.validateJWT,
  (req, res) => userController.UserRole(req, res),
);

export default user;
