import IMatche from './IMatche';

export type IMatcheModel = {
  findAll(): Promise<IMatche[]>;
  filteredMatches(term: boolean): Promise<IMatche[]>
};
