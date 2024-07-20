import { validate } from 'uuid';

export class Role {
  private readonly id: string;
  private readonly name: string;

  constructor(id: string, name: string) {
    if (!validate(id)) throw new Error('Invalidad id');
    if (name.length < 3) throw new Error('Invalidad name');

    this.id = id;
    this.name = name;
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
