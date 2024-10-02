import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
