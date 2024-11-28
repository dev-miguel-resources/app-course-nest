import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CourseEntity } from '../../../course/infraestructure/entities/course.entity';

import { Prices } from '../../domain/entities/prices';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Column({ type: 'varchar', length: 1000 })
  summary: string;

  @Column({ type: 'varchar', length: 1000 })
  slogan: string;

  @Column({ type: 'json' })
  prices: Prices;

  @Column({ type: 'timestamp' })
  dateStart: Date;

  @Column({ type: 'timestamp' })
  hourStart: Date;

  @Column({ type: 'timestamp' })
  hourEnd: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'int' })
  sessionsTotal: number;

  @Column({ type: 'varchar', length: 20 })
  frequency: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'json', nullable: true })
  whatLearn: string[];

  @Column({ type: 'json', nullable: true })
  requirements: string[];

  @Column({ type: 'json', nullable: true })
  content: string[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => CourseEntity, (course) => course.schedules)
  course: CourseEntity;
}
