import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { RoleEntity } from '../../../modules/role/infraestructure/entities/role.entity';

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

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable() // table dominante de la relación
  roles: RoleEntity[];
}
