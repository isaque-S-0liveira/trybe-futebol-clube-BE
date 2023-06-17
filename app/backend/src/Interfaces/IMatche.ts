export default interface IMatche {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  },
  awayTeam: {
    teamName: string;
  }
}

export type newMatche = {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
};

export interface newMatcheReturn extends newMatche{
  inProgress: boolean,
}
