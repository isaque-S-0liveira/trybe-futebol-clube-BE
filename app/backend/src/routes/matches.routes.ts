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
matche.patch(
  '/:id',
  UserValidate.validateJWT,
  (req: Request, res: Response) =>
    matchesController.updateMatcheInProgress(req, res),
);
matche.post(
  '/',
  UserValidate.validateJWT,
  (req: Request, res: Response) => matchesController.createNewMatche(req, res),
);
export default matche;
