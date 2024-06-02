import { Address } from '../entitities/address';
import { Role } from '../entitities/role';
import {
  UserProperties,
  UserUpdateProperties,
} from './interfaces/user.interface';

export class User {
  private readonly id: string;
  private fullname: string;
  private image: string;
  private address: Address;
  private readonly email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    if (!props.createdAt) this.createdAt = new Date();
  }

  properties() {
    return {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      image: this.image,
      address: this.address,
      password: this.password,
      refreshToken: this.refreshToken,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(fieldsToUpdate: UserUpdateProperties) {
    Object.assign(this, fieldsToUpdate);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
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
