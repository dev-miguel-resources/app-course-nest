import { TokenService } from '../../../../core/domain/services/token.service';
import { EmailVO } from '../value-objects/email.vo';
import { FullnameVO } from '../value-objects/fullname.vo';
import { IdVO } from '../value-objects/id.vo';
import { RefreshTokenVO } from '../value-objects/refresh-token';
import { RolesVO } from '../value-objects/roles.vo';
import { User, UserProperties } from './user';

export class UserFactory {
  static create(props: UserProperties) {
    IdVO.create(props.id);
    RefreshTokenVO.create(props.refreshToken);
    RolesVO.create(props.roles);
    FullnameVO.create(props.fullname);
    EmailVO.create(props.email);

    props.refreshToken = TokenService.generateRefreshToken();

    return new User(props);
  }
}
