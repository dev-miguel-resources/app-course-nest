import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { ScheduleEntity } from '../../../schedule/infraestructure/entities/schedule.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  slug: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | undefined;

  @Column({ type: 'boolean' })
  isDeleted: boolean;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.course)
  schedules: ScheduleEntity[];
}
