import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

Controller('users');
export class UsersController {
  constructor(private userService: UserService) {}

  //   add user to database
  @Post()
  //   @UsePipes(new ValidationPipe()) use it globally
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //   Get all users from database
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}

// controller layer interact with service layer and then service layer interact with all other layer
