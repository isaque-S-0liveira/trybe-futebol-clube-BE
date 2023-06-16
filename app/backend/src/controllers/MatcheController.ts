import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatcheService from '../services/MatcheService';

export default class MatchesController {
  constructor(
    private matcheService = new MatcheService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matcheService.getAllMatches();
    return res.status(200).json(serviceResponse.data);
  }
}
