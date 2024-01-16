import * as bcrypt from 'bcryptjs';

export class AuthUtils {
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static decryptPassword(plainPwd: string, hashedPwd: string): Promise<string> {
    return bcrypt.compare(plainPwd, hashedPwd);
  }
}
