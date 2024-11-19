import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { AppService } from '../../../app.service';
import { User } from '../../../modules/user/domain/roots/user';

export class TokenService {
  static generateAccessToken(user: User): string {
    const { fullname, roles, email, image } = user.properties();

    const payload = {
      fullname,
      roles,
      email,
      image,
    };

    const secretWord = AppService.jwt_secret;
    const expiresIn = AppService.jwt_expires_in;

    return jwt.sign(payload, secretWord, { expiresIn });
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }
}
