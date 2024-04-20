import { validate } from 'uuid';

export class IdVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  // especificación de creación mediante reglas
  static create(value: string): IdVO {
    if (value && (value.length === 0 || !validate(value))) {
      throw new Error('Invalid id');
    }
    return new IdVO(value);
  }
}
