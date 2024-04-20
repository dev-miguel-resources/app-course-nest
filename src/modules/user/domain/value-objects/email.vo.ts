export class EmailVO {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): EmailVO {
    if (!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      throw new Error('Invalid email address');
    }
    return new EmailVO(value);
  }
}
