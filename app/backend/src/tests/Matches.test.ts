import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatche from '../database/models/MatcheModel';

import { Response } from 'superagent';
import { matches, matchesResult } from './mocks/matches.mock';
import { validToken } from './mocks/users.mock';
import { verifyValid } from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', () => {
    describe('GET /matches', () => {
      afterEach(() => {
        sinon.restore();
      });
    
  it('Deve retornar todas as partidas', async () => {

     sinon.stub(SequelizeMatche, 'findAll').resolves(matchesResult as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesResult);
  });
  it('deve ser possivel filtrar somente partidas em andamento', async () => {

    sinon.stub(SequelizeMatche, 'findAll').resolves(matchesResult[1] as any);

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: true });;

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesResult[1]);
});


it('deve ser possivel filtrar somente partidas finalizadas', async () => {
  
  sinon.stub(SequelizeMatche, 'findAll').resolves(matchesResult[0] as any);
  
  const { status, body } = await chai.request(app).get('/matches').query({ inProgress: false });;
  
  expect(status).to.equal(200);
  expect(body).to.deep.equal(matchesResult[0]);
    }); 
  });
});
describe('PATCH /matches/:id', () => {

  it('deve ser possivel finalizar uma partida no DB', async () => {
    sinon.stub(SequelizeMatche, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').returns(verifyValid as any);

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', validToken)

    expect(status).to.equal(200);
    expect(body.message).to.equal('Finished');
});

it('deve retornar um erro se o id estiver incorrerto', async () => {
  sinon.stub(SequelizeMatche, 'update').resolves([null] as any);
  sinon.stub(jwt, 'verify').returns(verifyValid as any);

  const { status, body } = await chai.request(app).patch('/matches/99/finish')
    .set('authorization', validToken)

  expect(status).to.equal(404);
  expect(body.message).to.equal('Matche id not found');
});

it(' não deve ser possivel finalizar uma partida no DB quando o token não existir', async () => {
  sinon.stub(jwt, 'verify').returns(null as any);

  const res = await chai.request(app)
  .patch('/matches/1/finish')
  .set('authorization', '')

  expect(res).to.have.status(401)
  expect(res.body).to.deep.equal({ message: 'Token not found' })
});
    
it('não deve ser possivel finalizar uma partida no DB quando o token for invalido', async () => {

  sinon.stub(jwt, 'verify').returns(null as any);

    const res = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'token_invalido')

    expect(res).to.have.status(401)
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' })
});

 it('deve ser possivel atualizar partidas em andamento', async () => {
  sinon.stub(SequelizeMatche, 'findByPk').resolves(matches as any)
  sinon.stub(SequelizeMatche, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').returns(verifyValid as any);

    const { status, body } = await chai.request(app).patch('/matches/2')
      .set('authorization', validToken)

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
});

it('deve retornar um erro se o id for invalido', async () => {
  sinon.stub(SequelizeMatche, 'findByPk').resolves(null as any)
  sinon.stub(SequelizeMatche, 'update').resolves([null] as any);
  sinon.stub(jwt, 'verify').returns(verifyValid as any);

  const { status, body } = await chai.request(app).patch('/matches/99')
    .set('authorization', validToken)

  expect(status).to.equal(404);
  expect(body.message).to.equal('Matche id not found');
});


it('deve retornar um erro de conflito caso o id seja de uma partida finalizada', async () => {

  sinon.stub(SequelizeMatche, 'findByPk').resolves(matches[0] as any);
  sinon.stub(jwt, 'verify').returns(verifyValid as any);

  const { status, body } = await chai.request(app).patch('/matches/1')
    .set('authorization', validToken);

  expect(status).to.equal(409);
  expect(body.message).to.equal('the matche is over');
});

 it('não deve ser possivel atualizar partidas em andamento quando o token não é informado', async () => {
  sinon.stub(jwt, 'verify').returns(null as any);

  const res = await chai.request(app)
  .patch('/matches/1')
  .set('authorization', '')

  expect(res).to.have.status(401)
  expect(res.body).to.deep.equal({ message: 'Token not found' })
 });

it('não deve ser possivel atualizar partidas em andamento quando o token não é valido', async () => {
  sinon.stub(jwt, 'verify').returns(null as any);

    const res = await chai.request(app)
    .patch('/matches/1')
    .set('authorization', 'token_invalido')

    expect(res).to.have.status(401)
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' })
 });

it('deve ser possivel cadastrar uma nova partida', async () => {

            //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
              
            //     const {status, body} = await chai.request(app).get('/teams/99');
              
            //     expect(status).to.equal(404);
            //     expect(body).to.deep.equal({ message: 'Team not found' });
});

      it('não deve ser possivel cadastrar uma nova partida caso  não exista um token', async () => {

        //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
          
        //     const {status, body} = await chai.request(app).get('/teams/99');
          
        //     expect(status).to.equal(404);
        //     expect(body).to.deep.equal({ message: 'Team not found' });
        });

        it('não deve ser possivel cadastrar uma nova partida caso o token seja invalido', async () => {

            //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
              
            //     const {status, body} = await chai.request(app).get('/teams/99');
              
            //     expect(status).to.equal(404);
            //     expect(body).to.deep.equal({ message: 'Team not found' });
        });

        it('não deve ser possivel cadastrar uma nova partida com times iguais nem com um time que não existe na tabela de times', async () => {

            //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
              
            //     const {status, body} = await chai.request(app).get('/teams/99');
              
            //     expect(status).to.equal(404);
            //     expect(body).to.deep.equal({ message: 'Team not found' });
        });

  afterEach(sinon.restore);
});
