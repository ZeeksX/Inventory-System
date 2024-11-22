import { Controller, Post, Body } from '@nestjs/common';
import { RequestService } from './request.service';
import { Purchase } from './entities/purchase.entity';
import { ServiceRequest } from './entities/service-request.entity';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('purchase')
  async purchase(@Body() purchaseData: Partial<Purchase>) {
    return this.requestService.createPurchase(purchaseData);
  }

  @Post('service')
  async serviceRequest(@Body() serviceData: Partial<ServiceRequest>) {
    return this.requestService.createServiceRequest(serviceData);
  }
}
