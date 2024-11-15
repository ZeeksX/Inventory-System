import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { userRole } from '../../enum/role.enum';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assuming you have JWT Guard
// import { RolesGuard } from '../auth/roles.guard'; // Guard for roles
// import { Roles } from '../auth/roles.decorator'; // Custom decorator for role-based access control

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
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(userRole.admin)
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // Get a single user by ID
  //   @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  // Delete a user (admin only)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(userRole.admin)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
