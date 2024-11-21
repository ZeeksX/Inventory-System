import { Controller, Post, Body, Get, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { userRole } from '../../enum/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
    try {
      const response = await this.userService.login(email, password);
      console.log('Login Response:', response); // Log the entire response to the console
      console.log('User  Role:', response.user.role); // Log the user's role
      return response; // Return the response to the client
    } catch (error) {
      console.error('Login Error:', error); // Log the error for debugging
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Invalid Credentials',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get all users (admin only)
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // Get a single user by ID
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  // Delete a user (admin only)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}