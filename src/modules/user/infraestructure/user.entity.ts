import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 36, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string;

  @Column({ type: 'json', nullable: false })
  address: object;

  @Column({ type: 'varchar', length: 100, nullable: false })
  refreshToken: string;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: Date;

  roles: any[];
}
