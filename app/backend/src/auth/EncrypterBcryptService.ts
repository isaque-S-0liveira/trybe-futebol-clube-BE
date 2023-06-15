import * as bcrypt from 'bcryptjs';
import { IEncrypter } from '../Interfaces/IEncrypter';

export default class EncrypterBcryptService implements IEncrypter {
  private bcrypt = bcrypt;
  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await this.bcrypt.compare(password, hash);
    return isValid;
  }
}
