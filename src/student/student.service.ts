import { Inject, Injectable } from '@nestjs/common';

import { EnrollService } from './enroll.service';

@Injectable()
export class StudentService {
  // pendiente comportamiento
  constructor(
    @Inject('CONFIG4') private readonly config: { serverOAuth2: string },
    private readonly enrollService: EnrollService,
  ) {}

  getAll() {
    return Promise.resolve([
      'students1',
      'students2',
      'students3',
      this.config.serverOAuth2,
      this.enrollService.enroll(),
    ]);
  }
}
