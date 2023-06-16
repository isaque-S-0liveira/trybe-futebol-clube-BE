// import { ICRUDModelReader } from './ICRUDModel';
import IMatche from './IMatche';

export type IMatcheModel =
{
  findAll(): Promise<IMatche[]>
  filteredMatches(term: boolean): Promise<IMatche[]>,
  update(id:number): Promise<number | null>;
};
