import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { UserModule } from './modules/user/infraestructure/presentation/user.module';
import { RoleModule } from './modules/role/interfaces/role.module';
import { AppoinmentModule } from './modules/appoinment/infraestructure/presentation/appointment.module';
import { CourseModule } from './modules/course/infraestructure/presentation/course.module';
import { ScheduleModule } from './modules/schedule/infraestructure/presentation/schedule.module';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { AuthModule } from './modules/auth/infraestructure/presentation/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    UserModule,
    RoleModule,
    AppoinmentModule,
    CourseModule,
    ScheduleModule,
    AuthModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
