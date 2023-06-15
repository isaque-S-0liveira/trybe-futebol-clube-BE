import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/UserModel';

import { Response } from 'superagent';
import {invalidFormatEmail, invalidFormatPassword, invalidPassword, user, userRegistered, validLoginBody, validToken, verifyValid} from './mocks/users.mock'
import TokenGeneratorJwt from '../auth/TokenGeneratorJwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users Test', () => {
  describe('POST /login', () => {

    it('deve retornar um token', async () => {
      const userMock = SequelizeUser.build(userRegistered)
      sinon.stub(SequelizeUser, 'findOne').resolves(userMock)
      const response = await chai.request(app)
      .post('/login')
      .send(validLoginBody)
      
      expect(response.status).to.equal(200);
      expect(response.body.token).not.to.be.undefined;
    });
    it('deve retornar uma messagem de erro caso os campos não sejam preenchidos', async () => {
    const { status, body } = await chai.request(app).post('/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
    it('não é possivel fazer login com um email em um formato errado invalido', async function() {
      const { status, body } = await chai.request(app).post('/login')
        .send(invalidFormatEmail);
  
      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
    it('não é possivel fazer login com uma senha em um formato errado invalido', async function() {
      const { status, body } = await chai.request(app).post('/login')
        .send(invalidFormatPassword);
  
      expect(status).to.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  })
  it('não deve fazer login quando o usuário não for encontrado', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it('não deve fazer login quando a senha estiver incorreta', async function() {
    const userMock = SequelizeUser.build(userRegistered)
    sinon.stub(SequelizeUser, 'findOne').resolves(userMock);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(invalidPassword);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  describe('GET /login/role', () => {
   it('deve retornar a role do usuario caso o token seja valido', async () => {

      sinon.stub(jwt, 'verify').returns({role: 'admin'} as any);
      const res = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'token_valido')
      console.log(res.body);
      
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({role: 'admin'});
    });

  it('deve retornar o payload do token se o token for válido', () => {
    sinon.stub(jwt, 'sign').returns(validToken as any);
    sinon.stub(jwt, 'verify').returns(verifyValid as any)
    const result = { id: 1, role: 'admin', iat: 1686850644, exp: 1687282644 };

    expect(result).to.deep.equal(verifyValid);
  });

  it('deve retornar falso se o token for inválido', () => {
    const invalidToken = 'token inválido';

    const result = TokenGeneratorJwt.verify(invalidToken);

    expect(result).to.be.false;
  });
  
  it('deve retornar uma messagem de erro caso o token não exista', async () => {
    sinon.stub(TokenGeneratorJwt, 'verify').resolves(null);

    const res = await chai.request(app)
    .get('/login/role')
    .set('authorization', '')

    expect(res).to.have.status(401)
    expect(res.body).to.deep.equal({ message: 'Token not found' })
  })
  it('deve retornar uma messagem de erro caso o token seja invalido', async () => {
    sinon.stub(TokenGeneratorJwt, 'verify').resolves(null);

    const res = await chai.request(app)
    .get('/login/role')
    .set('authorization', 'token_invalido')

    expect(res).to.have.status(401)
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' })
  })
});
  afterEach(sinon.restore);
});
