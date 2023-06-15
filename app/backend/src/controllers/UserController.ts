import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TokenGeneratorJwt from '../auth/TokenGeneratorJwt';

export default class UserController {
  constructor(
    private userService: UserService,
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      const code = mapStatusHTTP(serviceResponse.status);
      return res.status(code).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async UserRole(req: Request, res: Response): Promise<object | void> {
    this.userService.login('a', 'b');
    const token = req.headers.authorization;
    const JwtPayload = TokenGeneratorJwt.verify(token as string);
    return res.status(200).json({ role: JSON.parse(JSON.stringify(JwtPayload)).role });
  }
}
