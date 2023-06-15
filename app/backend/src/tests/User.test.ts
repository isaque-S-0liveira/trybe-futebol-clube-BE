import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/UserModel';

import { Response } from 'superagent';
import {invalidFormatEmail, invalidFormatPassword, invalidPassword, userRegistered, validLoginBody} from './mocks/users.mock'

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
  afterEach(sinon.restore);
});
