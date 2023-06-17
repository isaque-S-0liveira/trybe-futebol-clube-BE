import { Request, Response } from 'express';
// import mapStatusHTTP from '../utils/mapStatusHTTP';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatcheService from '../services/MatcheService';

export default class MatchesController {
  constructor(
    private matcheService = new MatcheService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this.matcheService.getAllMatches();
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

  public async finishedMatche(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matcheService.finishedMatche(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatcheInProgress(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const matche = req.body;
    const serviceResponse = await this.matcheService.updateMatcheInProgress(id, matche);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createNewMatche(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const serviceResponse = await this.matcheService.createMatche(data);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
  }
}
