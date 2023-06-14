import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/TeamsModel';

import { Response } from 'superagent';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Test', () => {
  it('Deve retornar todos os times', async () => {

    sinon.stub(SequelizeTeam, 'findAll').resolves(teamsMock.teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock.teams);
  });
  it('deve retornar um time pelo id', async () => {

    sinon.stub(SequelizeTeam, 'findByPk').resolves(teamsMock.teams[0] as any);

    const res = await chai.request(app).get('/teams/1');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(teamsMock.teams[0]);
});
  it('deve retornar uma mensagem de erro caso o time não existir', async () => {

    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
  
    const {status, body} = await chai.request(app).get('/teams/99');
  
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team not found' });
});

  afterEach(sinon.restore);
});
