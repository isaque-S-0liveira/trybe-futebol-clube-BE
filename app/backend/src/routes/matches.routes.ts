import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatcheController';

const matchesController = new MatchesController();

const team = Router();

team.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default team;
