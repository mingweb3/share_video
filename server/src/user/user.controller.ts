import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { MJwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  @UseGuards(MJwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    // Return USER
    return user;
  }
}
