import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { ServiceRequest } from './entities/service-request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(ServiceRequest)
    private serviceRequestRepository: Repository<ServiceRequest>,
  ) {}

  async createPurchase(purchaseData: Partial<Purchase>) {
    return this.purchaseRepository.save(purchaseData);
  }

  async createServiceRequest(serviceData: Partial<ServiceRequest>) {
    return this.serviceRequestRepository.save(serviceData);
  }
}
