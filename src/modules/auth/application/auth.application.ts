import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthApplication {
  constructor() {
    // por definir
  }

  login(auth: any) {
    // por definir
  }
}

// GET -> ("/list", middlewareAuth, middlewareAuthorization, middlewareValidation, userController.list)
