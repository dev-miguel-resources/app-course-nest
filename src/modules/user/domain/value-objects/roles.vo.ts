import { Role } from '../entitities/role';

export class RolesVO {
  private readonly value: Role[];

  private constructor(value: Role[]) {
    this.value = value;
  }

  static create(value: Role[]): RolesVO {
    if (value.length === 0) throw new Error('Invalid roles');
    return new RolesVO(value);
  }
}
