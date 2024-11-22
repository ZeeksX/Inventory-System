import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userRole } from '../../enum/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Guard for authenticating JWT
import { RolesGuard } from '../auth/roles.guard'; // Guard for role-based authorization
import { Roles } from '../auth/role.decorator'; // Custom decorator for role-based access control

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register endpoint
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: userRole,
  ) {
    return this.userService.register(email, username, password, role);
  }

  // Login endpoint
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.login(email, password);
  }

  // Get all users (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.admin)
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // Get a single user by ID
  @UseGuards(JwtAuthGuard) // Protect this route with JWT Guard
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  // Delete a user (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRole.admin)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
