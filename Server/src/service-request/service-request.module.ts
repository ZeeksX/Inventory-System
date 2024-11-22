// src/service-request/service.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequest } from './entities/service-request.entity';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRequest])],
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService],
})
export class ServiceModule {}