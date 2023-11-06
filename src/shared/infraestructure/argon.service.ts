import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CryptoService } from '../domain/abstract/crypto-service';

@Injectable()
export class ArgonService implements CryptoService {
  constructor() {}
  hash(hashString: string): Promise<string> {
    return argon2.hash(hashString);
  }
  compare(password: string, hashPassword: string): Promise<boolean> {
    return argon2.verify(hashPassword, password);
  }
}
