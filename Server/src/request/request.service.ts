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
  ) { }

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
  // In request.service.ts
  async updatePurchaseStatus(id: number, status: string): Promise<Purchase> {
    try {
      const purchase = await this.purchaseRepository.findOne({ where: { id } });
      if (!purchase) {
        throw new HttpException('Purchase not found', HttpStatus.NOT_FOUND);
      }

      purchase.status = status; // Update the status
      return await this.purchaseRepository.save(purchase); // Save the updated purchase
    } catch (error) {
      throw new HttpException(`Error updating purchase: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // Update the status of a service request
  async updateServiceRequestStatus(id: number, status: string): Promise<ServiceRequest> {
    try {
      // Use an object with the id property to find the service request
      const serviceRequest = await this.serviceRequestRepository.findOne({ where: { id } });

      if (!serviceRequest) {
        throw new HttpException('Service request not found', HttpStatus.NOT_FOUND);
      }

      serviceRequest.status = status; // Update the status
      return await this.serviceRequestRepository.save(serviceRequest); // Save the updated request
    } catch (error) {
      throw new HttpException(`Error updating service request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}