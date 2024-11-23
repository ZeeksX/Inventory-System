import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { Purchase } from './entities/purchase.entity';
import { ServiceRequest } from './entities/service-request.entity';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('purchase')
  async purchase(@Body() purchaseData: Partial<Purchase>) {
    try {
      return await this.requestService.createPurchase(purchaseData);
    } catch (error) {
      throw new HttpException(
        `Error creating purchase: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('purchase') // Endpoint to get all purchases
  async getAllPurchases() {
    try {
      return await this.requestService.findAllPurchases();
    } catch (error) {
      throw new HttpException(
        `Error retrieving purchases: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('service')
  async serviceRequest(@Body() serviceData: Partial<ServiceRequest>) {
    try {
      return await this.requestService.createServiceRequest(serviceData);
    } catch (error) {
      throw new HttpException(
        `Error creating service request: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('service') // Endpoint to get all service requests
  async getAllServiceRequests() {
    try {
      return await this.requestService.findAllServiceRequests();
    } catch (error) {
      throw new HttpException(
        `Error retrieving service requests: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
