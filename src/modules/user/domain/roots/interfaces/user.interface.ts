export interface UserEssentials {
  readonly fullname: string;
  readonly image: string;
  readonly email: string;
  readonly password: string;
  readonly refreshToken: string;
  readonly roles: any[];
}

export interface UserOptionals {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;
