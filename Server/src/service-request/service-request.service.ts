import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRequest } from './entities/service-request.entity';  // Ensure this path is correct
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';

@Injectable()
export class ServiceRequestService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
  ) {}

  async create(createServiceRequestDto: CreateServiceRequestDto): Promise<ServiceRequest> {
    const serviceRequest = this.serviceRequestRepository.create(createServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
  }

  async findAll(): Promise<ServiceRequest[]> {
    return this.serviceRequestRepository.find();
  }

  async findOne(id: number): Promise<ServiceRequest> {
    const serviceRequest = await this.serviceRequestRepository.findOne({ where: { id } });
    if (!serviceRequest) {
      throw new NotFoundException(`Service request with id ${id} not found`);
    }
    return serviceRequest;
  }

  async update(id: number, updateServiceRequestDto: UpdateServiceRequestDto): Promise<ServiceRequest> {
    const serviceRequest = await this.findOne(id);
    Object.assign(serviceRequest, updateServiceRequestDto);
    return this.serviceRequestRepository.save(serviceRequest);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceRequestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service request with id ${id} not found`);
    }
  }
}