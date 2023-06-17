import MatcheModel from '../models/MatcheModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatche, { newMatche, newMatcheReturn } from '../Interfaces/IMatche';
import { IMatcheModel } from '../Interfaces/IMatcheModel';

export default class MatcheService {
  constructor(private matcheModel: IMatcheModel = new MatcheModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatche[]>> {
    const allMatches = await this.matcheModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesfiltered(term: boolean): Promise<ServiceResponse<IMatche[]>> {
    const allMatchesFiltered = await this.matcheModel.filteredMatches(term);
    return { status: 'SUCCESSFUL', data: allMatchesFiltered as unknown as IMatche[] };
  }

  public async finishedMatche(id: number):
  Promise<ServiceResponse<ServiceMessage>> {
    const matcheUpdated = await this.matcheModel.endMatch(id);
    if (!matcheUpdated) {
      return { status: 'NOT_FOUND', data: { message: 'Matche id not found' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatcheInProgress(id: number, matche: IMatche):
  Promise<ServiceResponse<IMatche>> {
    const matcheFound = await this.matcheModel.findById(id);
    if (!matcheFound) return { status: 'NOT_FOUND', data: { message: 'Matche id not found' } };

    if (matcheFound.inProgress === false) {
      return { status: 'CONFLICT',
        data: { message: 'the matche is over' } };
    }
    await this.matcheModel.update(id, matche);
    return { status: 'SUCCESSFUL', data: matcheFound };
  }

  public async createMatche(data: Omit<newMatche, 'id'>):Promise<ServiceResponse<newMatcheReturn>> {
    if (data.homeTeamId === data.awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.matcheModel.findIdTeam(data.homeTeamId);
    const awayTeam = await this.matcheModel.findIdTeam(data.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const newMatchee = await this.matcheModel.create(data);
    return { status: 'SUCCESSFUL', data: newMatchee as newMatcheReturn };
  }
}
