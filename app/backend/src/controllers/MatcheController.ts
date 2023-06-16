import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatcheService from '../services/MatcheService';

export default class MatchesController {
  constructor(
    private matcheService = new MatcheService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matcheService.getAllMatches();
    if (!inProgress) {
      return res.status(200).json(serviceResponse.data);
    }
    if (inProgress === 'true') {
      const response = await this.matcheService.getMatchesfiltered(true);
      return res.status(200).json(response.data);
    }
    if (inProgress === 'false') {
      const response = await this.matcheService.getMatchesfiltered(false);
      return res.status(200).json(response.data);
    }
  }
}
