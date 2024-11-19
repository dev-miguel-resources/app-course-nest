import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static get port(): number {
    return Number(process.env.PORT) || 3000;
  }

  static get db_host(): string {
    return process.env.DB_HOST || 'localhost';
  }

  static get db_port(): number {
    return Number(process.env.DB_PORT) || 3306;
  }

  static get db_username(): string {
    return process.env.DB_USERNAME || 'root';
  }

  static get db_password(): string {
    return process.env.DB_PASSWORD || '12345';
  }

  static get db_database(): string {
    return process.env.DB_DATABASE || 'db';
  }

  static get mongo_host(): string {
    return process.env.MONGO_HOST || 'localhost';
  }

  static get mongo_port(): number {
    return parseInt(process.env.MONGO_PORT) || 27017;
  }

  static get mongo_username(): string {
    return process.env.MONGO_USERNAME || 'root';
  }

  static get mongo_password(): string {
    return process.env.MONGO_PASSWORD || '12345';
  }

  static get jwt_secret(): string {
    return process.env.JWT_SECRET || 'secret';
  }

  static get jwt_expires_in(): string {
    return process.env.JWT_EXPIRES_IN || '1d';
  }
}
