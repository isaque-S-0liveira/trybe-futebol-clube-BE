import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatche from '../database/models/MatcheModel';

import { Response } from 'superagent';
import { matches, matchesResult } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', () => {
    describe('GET /matches', () => {

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
  it('deve ser possivel finalizar uma partida no DB', async () => {

//     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
  
//     const {status, body} = await chai.request(app).get('/teams/99');
  
//     expect(status).to.equal(404);
//     expect(body).to.deep.equal({ message: 'Team not found' });
});

it(' não deve ser possivel finalizar uma partida no DB quando o token não existir', async () => {

    //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
      
    //     const {status, body} = await chai.request(app).get('/teams/99');
      
    //     expect(status).to.equal(404);
    //     expect(body).to.deep.equal({ message: 'Team not found' });
    });
    it('não deve ser possivel finalizar uma partida no DB quando o token for invalido', async () => {

        //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
          
        //     const {status, body} = await chai.request(app).get('/teams/99');
          
        //     expect(status).to.equal(404);
        //     expect(body).to.deep.equal({ message: 'Team not found' });
        });

 it('deve ser possivel atualizar partidas em andamento', async () => {

    //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
      
    //     const {status, body} = await chai.request(app).get('/teams/99');
      
    //     expect(status).to.equal(404);
    //     expect(body).to.deep.equal({ message: 'Team not found' });
    });

 it('não deve ser possivel atualizar partidas em andamento quando o token não é informado', async () => {

        //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
          
        //     const {status, body} = await chai.request(app).get('/teams/99');
          
        //     expect(status).to.equal(404);
        //     expect(body).to.deep.equal({ message: 'Team not found' });
     });
     it('não deve ser possivel atualizar partidas em andamento quando o token não é valido', async () => {

        //     sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
          
        //     const {status, body} = await chai.request(app).get('/teams/99');
          
        //     expect(status).to.equal(404);
        //     expect(body).to.deep.equal({ message: 'Team not found' });
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
