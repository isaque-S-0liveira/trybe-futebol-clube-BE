import IUser from './IUser';

export interface TokenGenerator {
  generate(user: IUser): string
}
