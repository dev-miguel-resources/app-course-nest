import { validate } from 'uuid';

export interface CourseEssentials {
  readonly id: string;
  readonly title: string;
  readonly slug: string; // para el seo
}

export interface CourseOptionals {
  readonly createdAt: Date;
  readonly updatedAt: Date | undefined;
  readonly isDeleted: boolean;
}

export type CourseProps = CourseEssentials & Partial<CourseOptionals>;
export type CourseFieldsUpdate = Omit<CourseEssentials, 'id' | 'slug'>;

export class Course {
  private readonly id: string;
  private title: string;
  private slug: string;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private isDeleted: boolean;

  constructor(props: CourseProps) {
    if (!validate(props.id)) throw new Error('Invalid id');
    if (props.title.length < 3) throw new Error('Title too short');
    if (props.slug.length < 3) throw new Error('Slug too short');

    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
    this.isDeleted = props.isDeleted ?? false;
    this.createdAt = props.createdAt ?? new Date();
  }

  get properties() {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isDeleted: this.isDeleted,
    };
  }

  update(fields: CourseFieldsUpdate) {
    Object.assign(this, fields);
    this.updatedAt = new Date();
  }

  delete() {
    this.isDeleted = true;
    this.updatedAt = new Date();
  }
}
