import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  // PrismaService : can call it "Injection"
  constructor(
    private prismaService: PrismaService,
    private jwtSerivce: JwtService,
    private configService: ConfigService,
  ) {}

  async register(authDTO: AuthDTO) {
    // generate Password to hash
    const hashedPassword = await argon.hash(authDTO.password);
    try {
      // Insert DATA to tableDB
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
          name: authDTO.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });
      return await this.signToJwtStr({ userId: user.id, email: user.email });
    } catch (error) {
      if (error.code === 'P2002' || error.code === 'P2021') {
        throw new ForbiddenException('Please choose another email');
      }
      return { error };
    }
  }

  async login(authDTO: AuthDTO) {
    // find USER in DB to verify Data
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Email/Password are incorrect!');
    }

    // Verify Password
    const isPasswordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );

    if (!isPasswordMatched) {
      throw new ForbiddenException('Email/Password are incorrect!');
    }

    delete user.hashedPassword; // Hide hashedPassword field
    return await this.signToJwtStr({ userId: user.id, email: user.email });
  }

  async signToJwtStr({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const tokenStr = await this.jwtSerivce.signAsync(payload, {
      expiresIn: '3600m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return { accessToken: tokenStr };
  }
}
