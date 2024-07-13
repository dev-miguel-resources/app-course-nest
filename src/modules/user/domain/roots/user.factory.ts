// fábrica con las reglas de negocio de User
import { v4 as uuidv4 } from 'uuid';
import { EmailVO } from '../value-objects/email.vo';
import { FullnameVO } from '../value-objects/fullname.vo';
import { IdVO } from '../value-objects/id.vo';
import { RefreshTokenVO } from '../value-objects/refresh-token';
import { RolesVO } from '../value-objects/roles.vo';
import { User } from './user';
import { UserProperties } from './interfaces/user.interface';

// forma 4: ideal
export class UserFactory {
  static create(props: UserProperties) {
    IdVO.create(props.id);
    RefreshTokenVO.create(props.refreshToken);
    RolesVO.create(props.roles);
    FullnameVO.create(props.fullname);
    EmailVO.create(props.email);

    props.refreshToken = uuidv4();

    return new User(props);
  }
}
