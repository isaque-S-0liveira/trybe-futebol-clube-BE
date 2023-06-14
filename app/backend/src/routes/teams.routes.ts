import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const team = Router();

team.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

team.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default team;
