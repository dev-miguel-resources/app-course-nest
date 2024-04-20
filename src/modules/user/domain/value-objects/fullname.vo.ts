export class FullnameVO {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create(value: string): FullnameVO {
    if (value.length === 0) throw new Error('Invalid Fullname');
    return new FullnameVO(value);
  }
}
