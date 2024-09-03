import { Prices } from '../entities/prices';

export enum TYPE_COURSE {
  NORMAL = 'NORMAL',
  PRO = 'PRO',
}

export enum FREQUENCY {
  WEELY = 'WEELY',
  DAILY = 'DAILY',
}

export enum STATUS_SCHEDULE {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export type ScheduleProps = ScheduleEssencials & Partial<ScheduleOptionals>;
export type ScheduleUpdateProps = Partial<
  Omit<ScheduleEssencials, 'id'> &
    Omit<ScheduleOptionals, 'createdAt' | 'updatedAt' | 'deletedAt'>
>;

export interface ScheduleEssencials {
  readonly id: string;
  readonly title: string;
  readonly type: TYPE_COURSE;
  readonly summary: string;
  readonly slogan: string;
  readonly prices: Prices;
  readonly dateStart: Date;
  readonly hourStart: Date;
  readonly hourEnd: Date;
  readonly duration: number;
  readonly frequency: FREQUENCY;
  readonly courseId: string;
  // pendiente
}

export interface ScheduleOptionals {
  readonly status: STATUS_SCHEDULE;
  readonly whatLearn: string[];
  readonly requirements: string[];
  readonly content: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
}

// falta una definición de eventos
export class Schedule {
  private readonly id: string;
  private title: string;
  private type: TYPE_COURSE;
  private summary: string;
  private slogan: string;
  private prices: Prices;
  private dateStart: Date;
  private hourStart: Date;
  private hourEnd: Date;
  private duration: number;
  private frequency: FREQUENCY;
  private courseId: string;
  private status: STATUS_SCHEDULE;
  private whatLearn: string[];
  private requirements: string[];
  private content: string[];
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;
  // pendiente: sessions

  constructor(props: ScheduleProps) {
    // falta algo con eventos
    Object.assign(this, props);
    this.createdAt = props.createdAt || new Date();
    this.status = props.status || STATUS_SCHEDULE.DRAFT;
  }

  get properties() {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      summary: this.summary,
      slogan: this.slogan,
      prices: this.prices,
      dateStart: this.dateStart,
      hourStart: this.hourStart,
      hourEnd: this.hourEnd,
      duration: this.duration,
      frequency: this.frequency,
      courseId: this.courseId,
      status: this.status,
      whatLearn: this.whatLearn,
      requirements: this.requirements,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      // faltaría algo para más adelante
    };
  }

  update(props: ScheduleUpdateProps) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
