/*import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // -> /
export class AppController {
  // INJECTION OF DEPENDENCY (DI): design pattern
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const controller = UsersController;
    console.log('path', Reflect.getMetadata('path', controller)); // en tiempo de ejecución
    console.log('paths', Reflect.getMetadata('paths', controller));
    return this.appService.getHello();
  }
}

// decorador de método
function MetodoGet(path: string) {
  return function (
    target: any,
    propertykey: string,
    //descriptor: PropertyDescriptor,
  ): any {
    if (!Reflect.hasMetadata('paths', target.constructor)) {
      Reflect.defineMetadata('paths', [], target.constructor);
    }

    const paths = Reflect.getMetadata('paths', target.constructor);

    paths.push({
      path,
      verb: 'get',
      methodName: propertykey, // list
    });

    Reflect.defineMetadata('paths', paths, target.constructor);
  };
}

// reflect metadata de accesibilidad de datos (data de la data) -> sobre -> destinatorio -> trabaja con lo recibido
// decorador de factoria afecto a un contexto de clase
function Controlador(path: string) {
  return function (constructor: any) {
    console.log('Controlador', path); // tiempo de compilación
    Reflect.defineMetadata('path', path, constructor); // esta metadata -> solamente es accesible cuando exista una instancia de clase que ocupa el decorador
  };
}

@Controlador('/users')
export class UsersController {
  constructor() {
    //console.log('UsersController');
  }

  @MetodoGet('/list')
  list() {
    console.log('list');
  }
}*/

/*Cuando se utiliza el decorador @ApiExcludeController() en un controlador, este controlador y 
todas sus rutas asociadas no aparecerán en la documentación Swagger generada automáticamente. 
Esto es útil en los siguientes casos:
Controladores internos o administrativos: Si tienes controladores que no deberían 
ser accesibles públicamente o que están destinados solo para administración interna, 
es posible que desees ocultarlos de la documentación.*/
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hola';
  }
}
