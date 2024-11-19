import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { User } from '../../domain/roots/user';

class RoleResponse {
  id: string;
}

class AddressResponse {
  city: string;
  number: number;
  street: string;
  country: string;
}

export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  fullname: string;

  @Expose()
  email: string;

  @Expose()
  image: string;

  @Expose()
  roles: RoleResponse[];

  @Expose()
  address: AddressResponse;

  @Exclude()
  password: string;
}

// dto de response: como devolver como salida de respuesta el user
export class UserResponseDTO {
  static fromDomainToResponse(
    data: User | User[],
  ): UserResponse | UserResponse[] {
    if (Array.isArray(data)) {
      return data.map((user) => {
        const properties = user.properties();
        properties.address = Object.assign({}, user.properties().address);
        return plainToInstance(UserResponse, properties, {
          excludeExtraneousValues: true,
        });
      });
    }
    const properties = data.properties();
    properties.address = Object.assign({}, data.properties().address);
    return plainToInstance(UserResponse, properties, {
      excludeExtraneousValues: true,
    });
  }
}
