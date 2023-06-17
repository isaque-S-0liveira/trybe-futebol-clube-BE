const matches =  [
    {
      id: 1,
      home_team_id: 16,
      home_team_goals: 1,
      away_team_id: 8,
      away_team_goals: 1,
      inProgress: false,
    },
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
    }
];

const newMatche = {
  homeTeamId: 16,
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}
const teamNotFound = {
  homeTeamId: 99,
  awayTeamId: 98, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const teamsEquals = {
  homeTeamId: 1,
  awayTeamId: 1, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const matchesResult = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    }
  ]

export {
    matches,
    matchesResult,
    newMatche,
    teamNotFound,
    teamsEquals
};