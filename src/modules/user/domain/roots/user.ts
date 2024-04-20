import { Role } from '../entitities/role';
import { UserProperties } from './interfaces/user.interface';

export class User {
  private readonly id: string;
  private fullname: string;
  private image: string;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    this.createdAt = new Date();
    // solución 1: constructor
  }

  properties() {
    return {
      id: this.id,
      fullname: this.fullname,
      image: this.image,
      password: this.password,
      refreshToken: this.refreshToken,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  // solución 2: dentro de la especificación de un método directamente con las reglas
  // solución 3: dentro de la especificación de un método pero que reciba cada VO
  /*static create(props: UserProperties): User {
    //IdVO.create(props.id);
    //RefreshTokenVO.create(props.refreshToken);
    // continuar con cada VO
    // return new User(props);
    /*if (props.id && props.id.length === 0) {
      throw new Error('Invalid id');
    }
    if (props.refreshToken && props.refreshToken) {
      throw new Error('Invalid refresh token');
    }
    if (props.fullname.length === 0) {
      throw new Error('Invalid fullname');
    }
    if (props.roles.length === 0) {
      throw new Error('Invalid roles');
    }
    if (
      !props.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    ) {
      throw new Error('Invalid email');
    }

    return new User(props);
  }*/
}
