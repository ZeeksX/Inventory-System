// src/service-request/service.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDto } from './dto/service.dto';
import { Service } from './entities/service.entity';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async createService(@Body() serviceDto: ServiceDto): Promise<Service> {
    return this.serviceService.createService(serviceDto);
  }

  @Get()
  async getAllServices(): Promise<Service[]> {
    return this.serviceService.getAllServices();
  }
}