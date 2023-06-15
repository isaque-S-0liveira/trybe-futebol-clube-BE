import UserModel from '../models/UserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserModel } from '../Interfaces/IUserModel';
import { IEncrypter } from '../Interfaces/IEncrypter';
import { TokenGenerator } from '../Interfaces/TokenGenerator';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private encrypter: IEncrypter,
    private tokenGenerator: TokenGenerator,
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isValid = await this.encrypter.compare(password, user.password);

    if (!isValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = this.tokenGenerator.generate(user);

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}
