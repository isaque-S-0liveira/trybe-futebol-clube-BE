import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatcheController';
import UserValidate from '../middlewares/userValidate';

const matchesController = new MatchesController();

const matche = Router();

matche.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

matche.patch(
  '/:id/finish',
  UserValidate.validateJWT,
  (req: Request, res: Response) =>
    matchesController.finishedMatche(req, res),
);
export default matche;
