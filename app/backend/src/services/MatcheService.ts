import MatcheModel from '../models/MatcheModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
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
}
