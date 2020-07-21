import { scrypt, randomBytes } from 'crypto'; // scrypt is callback based
import { promisify } from 'util'; // turns scrypt to promised based function

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    const bufString = buf.toString('hex');
    return buf.toString('hex') === hashedPassword;
  }
}
