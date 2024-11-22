import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { ServiceRequest } from './entities/service-request.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,

    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
  ) {}

  // Create a new purchase
  async createPurchase(purchaseData: Partial<Purchase>): Promise<Purchase> {
    try {
      const purchase = this.purchaseRepository.create(purchaseData);
      return await this.purchaseRepository.save(purchase);
    } catch (error) {
      throw new HttpException(`Error creating purchase: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Find all purchases
  async findAllPurchases(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  // Create a new service request
  async createServiceRequest(serviceData: Partial<ServiceRequest>): Promise<ServiceRequest> {
    try {
      const serviceRequest = this.serviceRequestRepository.create(serviceData);
      return await this.serviceRequestRepository.save(serviceRequest);
    } catch (error) {
      throw new HttpException(`Error creating service request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Find all service requests
  async findAllServiceRequests(): Promise<ServiceRequest[]> {
    return this.serviceRequestRepository.find();
  }
}