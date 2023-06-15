export interface IEncrypter {
  compare(password: string, hash: string): Promise<boolean>
}
