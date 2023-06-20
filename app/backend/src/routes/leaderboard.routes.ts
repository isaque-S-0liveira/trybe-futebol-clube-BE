import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboard = Router();

leaderboard.get('/', (req: Request, res: Response) =>
  leaderboardController.getAllLeaderboards(req, res));

export default leaderboard;
