import MatcheModel from '../models/MatcheModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatche from '../Interfaces/IMatche';
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
    const matcheUpdated = await this.matcheModel.update(id);
    if (!matcheUpdated) {
      return { status: 'NOT_FOUND', data: { message: 'Matche id not found' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
