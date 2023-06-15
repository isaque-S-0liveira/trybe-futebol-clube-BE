import * as jwt from 'jsonwebtoken';

export default class TokenGeneratorJwt {
  private static jwt = jwt;
  private static secret: string = process.env.JWT_SECRET || 'SECRET';

  private static jwtConfig: jwt.SignOptions = {
    expiresIn: '5d',
    algorithm: 'HS256',
  };

  static generate(user: jwt.JwtPayload): string {
    const token = this.jwt.sign({ id: user.id, role: user.role }, this.secret, this.jwtConfig);
    return token;
  }

  static verify(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return false;
    }
  }
}
