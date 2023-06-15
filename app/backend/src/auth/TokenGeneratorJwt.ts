import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';
import { TokenGenerator } from '../Interfaces/TokenGenerator';

export default class TokenGeneratorJwt implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '5d',
      algorithm: 'HS256',
    };
    const secret = process.env.JWT_SECRET || 'SECRET';
    const token = this.jwt.sign({ id: user.id, role: user.role }, secret, jwtConfig);
    return token;
  }
}
