import slugify from 'slugify';
import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '../../domain/repositories/course.repository';
import { CourseInfraestructure } from '../../infraestructure/course.infraestructure';

@Injectable()
export class CourseService {
  constructor(
    @Inject(CourseInfraestructure)
    private readonly repository: CourseRepository,
  ) {}

  async generateSlug(title: string): Promise<string> {
    // recibir el slug generado
    let slugGenerated = '';

    // inicializar un contador que se usa para diferencias slugs similares
    let count = 0;

    do {
      // mynode-1
      const prevTitle = count === 0 ? title : `${title}-${count}`;
      slugGenerated = slugify(prevTitle, { lower: true, trim: true });
      const existsCourse = await this.repository.findBySlug(slugGenerated);

      // Si el slug ya existe en el course, reiniciar el slugGenerated y aumentamos el contador para generar un nuevo slug
      if (existsCourse) {
        slugGenerated = '';
        count++;
      }

      // Continúa ejecutándose mientras el slugGenerated esté vacío
    } while (slugGenerated === '');

    // devolvemos el slug
    return slugGenerated;
  }
}
