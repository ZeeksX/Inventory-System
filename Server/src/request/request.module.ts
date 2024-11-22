import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ServiceRequest } from './entities/service-request.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, ServiceRequest])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
