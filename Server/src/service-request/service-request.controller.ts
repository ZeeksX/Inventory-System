import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';

@Controller('service-requests')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.serviceRequestService.create(createServiceRequestDto);
  }

  @Get()
  findAll() {
    return this.serviceRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Convert id to a number before passing it to the service
    return this.serviceRequestService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServiceRequestDto: UpdateServiceRequestDto) {
    // Convert id to a number before passing it to the service
    return this.serviceRequestService.update(+id, updateServiceRequestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Convert id to a number before passing it to the service
    return this.serviceRequestService.remove(+id);
  }
}