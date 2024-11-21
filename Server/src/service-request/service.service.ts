// src/service-request/service.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ServiceDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async createService(serviceDto: ServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(serviceDto);
    service.serviceDate = new Date().toISOString().split('T')[0]; // Set the current date
    service.status = 'Pending'; // Set initial status
    return this.serviceRepository.save(service);
  }

  async getAllServices(): Promise<Service[]> {
    return this.serviceRepository.find();
  }
}