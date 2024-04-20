import { validate } from 'uuid';

export class RefreshTokenVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): RefreshTokenVO {
    if (value && (value.length === 0 || !validate(value))) {
      throw new Error('Invalid refresh token');
    }
    return new RefreshTokenVO(value);
  }
}
