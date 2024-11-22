import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { ServiceRequest } from './entities/service-request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,

    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
  ) {}

  // Create a new purchase
  async createPurchase(purchaseData: Partial<Purchase>) {
    try {
      const purchase = this.purchaseRepository.create(purchaseData);
      return await this.purchaseRepository.save(purchase);
    } catch (error) {
      throw new Error(`Error creating purchase: ${error.message}`);
    }
  }

  // Create a new service request
  async createServiceRequest(serviceData: Partial<ServiceRequest>) {
    try {
      const serviceRequest = this.serviceRequestRepository.create(serviceData);
      return await this.serviceRequestRepository.save(serviceRequest);
    } catch (error) {
      throw new Error(`Error creating service request: ${error.message}`);
    }
  }
}
