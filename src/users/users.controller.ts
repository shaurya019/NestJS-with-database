import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

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

  //   Get user by id
  // users/:id
  // it will be a async function
  @Get(':id')
  async getUsersById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Id Invalid', 404);
    const findUser = await this.userService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  //   Update user
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Id Invalid', 404);
    const updateuser = await this.userService.updateUser(id, updateUserDto);
    if (!updateuser) throw new HttpException('User not found', 404);
    return updateuser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Id Invalid', 404);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return;
  }
}

// controller layer interact with service layer and then service layer interact with all other layer
