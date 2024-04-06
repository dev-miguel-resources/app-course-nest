import { UserProperties } from './interfaces/user.interface';

export class User {
  private readonly id: string;
  private fullname: string;
  private image: string;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private roles: any[]; // cambiar al tipo adecuado
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    this.createdAt = new Date();
  }

  // métodos de clase
}
